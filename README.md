# DemocratizeHfund
This is a project about a hedge fund that used blockchain to provide trust and allow its members to take part and develop an investment strategy that every can vote on.

The project used as starter kit the code of https://github.com/dappuniversity/social-network.

First install dependencies.

    npm install
  
Then make sure you have truffle running get into the folder

    cd DemocratizeHfund
  
Compile and migrate the smart contracts  to the blockchain 

    truffle compile 
    truffle migrate --reset
  
Make sure you have metamask install and switch  to your private network and open development server 

    npm run start


<b>UI</b>

<img src="https://user-images.githubusercontent.com/97196020/148573484-7a5a6978-c0ff-44c8-b2bf-9dab2edd48be.png" width="600" >

  <p>&nbsp;</p>
  
<i>A User can create votes for investment proposal to the community by a drop-down menu. To create a proposal, you must write the reasoning behind that decision, know the address of the Token you want the community to invest in and indicated the amount. That information will be later used to make the trade automatically if the proposal pass. </i>
    
<img src="https://user-images.githubusercontent.com/97196020/148574856-004e23fe-3710-416e-b874-9937b2e3fd90.png" width="600" >
    
<i>Every proposal has a 24-hour time limit. If 65% of the community vote "yes" then the proposal pass, and the trade executed automatically. In the time of the voting withdraws from the fund freeze and automatically open when the voting ends.  </i>
        
    votingStart[postCount] = votingStart[postCount] + block.timestamp;
  
 <i> To be able to create a vote or vote on an investment proposal, first you must have deposit money in the fund. </i>

    require(etherBalanceOf[msg.sender]>0, 'Error, no previous deposit');
 
  <i>Also, every user can only vote ones and his vote is worth as much as the money that it has in the fund. </i>
 
    require(etherBalanceOf[msg.sender]>0, 'Error, no previous deposit');
    require(pinakas[msg.sender][_id]==false, 'Error, user already vote');
  
    _post.upvotes = _post.upvotes + userBalance;
    
 <img src="https://user-images.githubusercontent.com/97196020/148590072-39da653e-fa48-4cd4-af80-ba4aa9b89d34.png" width="600" >
 
 <i>Deposit and withdraw functions exist in the upper right part of the page in a drop-down form. In this space there also information’s about the user, his wallet address and the value of his money invested in the fund + profit and (loss) </i>
 
 <img src="https://user-images.githubusercontent.com/97196020/148589931-87c4f52f-65de-49ff-be4b-2e8dc549930b.png" width="200" >

 <i>Since the value of the fund will fluctuate according to its investment every user can withdraw as much as his deposit was + or - a percentage that equals the percentage if profit of loss that the fund made since his deposit.</i>
  
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
  
  <p>&nbsp;</p>
   
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
     
     
 <i> At the left side of the side a table of that show liquidity and price of tokens in uniswap. To collect this data and make it up to date I used Graph apis and every coin individual address. </i>
 
  
 <img src="https://user-images.githubusercontent.com/97196020/148599766-e6567340-9810-4bc2-a63a-269a9524014f.png" width="200" >
 
 
 <b>Note</b> <i> This project is not finalised yet, I'm still working on the automating trading function. When complete it will be deployed at a test network </i>




 
  



