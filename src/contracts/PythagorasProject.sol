pragma solidity ^0.5.0;

contract PythagorasProject {
  

  string public name;
  uint public postCount = 0;
  uint public userid = 0;
  uint public totalbalance1 = 0;
  uint public totalbalance2 = 0;
  uint public persentage = 0;
  uint public currentTime = 8000;
  address public x = 0xf27C00B9Ef52b6ADCBAd02a1C3F7e7459925108e;
  mapping(uint => Post) public posts;
  mapping(address => uint) public depositStart;
  mapping(uint => address) public y;
  mapping(address => uint) public etherBalanceOf;
  mapping(address => uint) public userpersentage;
  mapping(uint => uint) public votingStart;
  mapping(address => mapping(uint256 => bool)) public pinakas;



  mapping(address => bool) public isDeposited;
  mapping(address => bool) public notvote;

  

  struct Post {
    uint id;
    string content;
    uint upvotes;
    uint downvotes;
    address payable author;
    address payable invest;
    string amount;
  }

  event PostCreated(
      uint id,
      string content,
      uint upvotes,
      uint downvotes,
      address payable author,
      address payable invest,
      string amount
    );

  event Upvoting(
      uint id,
      string content,
      uint upvotes,
      uint downvotes,
      address payable author,
      address payable invest,
      string  amount
    );

  event Downvoting(
      uint id,
      string content,
      uint upvotes,
      uint downvotes,
      address payable author,
      address payable invest,
      string  amount
    );

  event Deposit(
      address indexed user, 
      uint etherAmount, 
      uint timeStart
    );

  event Withdraw(
      address indexed user, 
      uint etherAmount, 
      uint depositTime, 
      uint interest
    );



  constructor() public{
    name = "PythagorasProject";
  }
  

  function deposit() payable public {

    require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');
    

    etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
    for (uint i=0; i<=userid; i++) {
      if (y[i]!=msg.sender) {
        userid = userid + 1 ;
        y[userid]=msg.sender;
      }
    }
    for (uint i=0; i<=userid; i++) {
      x=y[i];
      totalbalance1=totalbalance1+etherBalanceOf[x];
    }


    isDeposited[msg.sender] = true; //activate deposit status
    emit Deposit(msg.sender, msg.value, block.timestamp);
  }

  



  function createPost(string memory _content, address payable invest, string memory amount) public {
    // Require valid content 
    require(bytes(_content).length > 0);
    require(etherBalanceOf[msg.sender]>0, 'Error, no previous deposit');
    // increment the post count =
    postCount ++;
    //create the post
    Post storage post = posts[postCount];
    post.id=postCount;
    post.content=_content;
    post.upvotes=0;
    post.downvotes=0;
    post.author=(msg.sender);
    post.invest=(invest);
    post.amount=amount;
    votingStart[postCount] = votingStart[postCount] + block.timestamp;
    //trigger event
    emit PostCreated(postCount, _content, 0, 0, msg.sender, invest, amount);
  }

  function Upvote(uint _id) public payable{
    require(etherBalanceOf[msg.sender]>0, 'Error, no previous deposit');
    require(pinakas[msg.sender][_id]==false, 'Error, user already vote');
    require(_id > 0 && _id <= postCount);
    //giving 12h for each voting
    currentTime = block.timestamp - votingStart[_id];
    require(currentTime <= 7200, 'Error, voting is over');
    //fetch the post
    Post memory _post = posts [_id];
    //fetch the author 
    address payable _author = 0xf27C00B9Ef52b6ADCBAd02a1C3F7e7459925108e;
    //Pay the author by sending them ether
    address(_author).transfer(msg.value); 
    //Incremet the tip amount 
    uint userBalance = etherBalanceOf[msg.sender];
    _post.upvotes = _post.upvotes + userBalance;
    //update the post
    posts[_id] = _post;
    pinakas[msg.sender][_id]=true;
    //allow to vote only once
    emit Upvoting(postCount, _post.content, _post.upvotes,_post.downvotes , _author, _post.invest, _post.amount);
  }

  function Downvote(uint _id) public payable{
    require(etherBalanceOf[msg.sender]>0, 'Error, no previous deposit');
    require(pinakas[msg.sender][_id]==false, 'Error, user already vote');
    require(_id > 0 && _id <= postCount);
    //giving 12h for each voting
    currentTime = block.timestamp - votingStart[_id];
    require(currentTime <= 7200, 'Error, voting is over');
    //fetch the post
    Post memory _post = posts [_id];
    //fetch the author 
    address payable _author = 0xf27C00B9Ef52b6ADCBAd02a1C3F7e7459925108e;
    //Pay the author by sending them ether
    address(_author).transfer(msg.value); 
    //Incremet the tip amount 
    uint userBalance = etherBalanceOf[msg.sender];
    _post.downvotes = _post.downvotes + userBalance;
    //update the post
    //allow to vote only once
    pinakas[msg.sender][_id]=true;
    posts[_id] = _post;
    emit Downvoting(postCount, _post.content, _post.upvotes, _post.downvotes , _author, _post.invest, _post.amount);
  }

  function withdraw(uint amount) payable public {
    require(isDeposited[msg.sender]==true, 'Error, no previous deposit');
    require(totalbalance1>0, 'Error, Something wrong I can feel it');
    require(amount>0, 'Error, put some value');
    
    if (postCount!=0){
      currentTime = block.timestamp - votingStart[postCount];
      require(currentTime >= 7200, 'Error, on going voting');
    }

    for (uint i=0; i<=userid; i++) {
      x=y[i];
      totalbalance2=totalbalance2+etherBalanceOf[x];
    }
    persentage=((totalbalance1-totalbalance2)*100)/totalbalance1;
    uint userBalance = etherBalanceOf[msg.sender] + (persentage/100);
    uint userBalanceSender = userBalance;
    require(amount<=userBalance, 'Error, withdraw must be <= userBalance');
    msg.sender.transfer(amount); //eth back to user


    //check user's hodl time
    uint depositTime = block.timestamp - depositStart[msg.sender];

    uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender] / 1e16);
    uint interest = interestPerSecond * depositTime;

    //send funds to user
    
    totalbalance1=totalbalance1-amount;
    for (uint i=0; i<=userid; i++) {
      x=y[i];
      userBalance = etherBalanceOf[x] + (persentage/100);
      etherBalanceOf[x] = userBalance;
    }
    etherBalanceOf[msg.sender] = userBalanceSender-amount;

    //reset depositer data
    depositStart[msg.sender] = 0;
    totalbalance2 = 0; 

    emit Withdraw(msg.sender, userBalance, depositTime, interest);
  }

}