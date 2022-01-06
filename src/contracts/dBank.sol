pragma solidity ^0.5.0;


contract dBank {


  mapping(address => uint) public depositStart;
  mapping(address => uint) public etherBalanceOf;

  mapping(address => bool) public isDeposited;

  event Deposit(address indexed user, uint etherAmount, uint timeStart);
  event Withdraw(address indexed user, uint etherAmount, uint depositTime, uint interest);

  constructor() public {
  }

  function deposit() payable public {

    require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');

    etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;


    isDeposited[msg.sender] = true; //activate deposit status
    emit Deposit(msg.sender, msg.value, block.timestamp);
  }

  function withdraw() public {
    require(isDeposited[msg.sender]==true, 'Error, no previous deposit');
    uint userBalance = etherBalanceOf[msg.sender]; //for event

    //check user's hodl time
    uint depositTime = block.timestamp - depositStart[msg.sender];

    uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender] / 1e16);
    uint interest = interestPerSecond * depositTime;

    //send funds to user
    msg.sender.transfer(etherBalanceOf[msg.sender]); //eth back to user

    //reset depositer data
    depositStart[msg.sender] = 0;
    etherBalanceOf[msg.sender] = 0;
    isDeposited[msg.sender] = false;

    emit Withdraw(msg.sender, userBalance, depositTime, interest);
  }


}