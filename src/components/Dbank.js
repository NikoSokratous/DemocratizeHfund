import { Tabs, Tab } from 'react-bootstrap'
import PythagorasProject from '../abis/PythagorasProject.json'
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class Dbank extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      } else {
        window.alert('Please login with MetaMask')
      }

      //load contracts
      const networkId = await web3.eth.net.getId()
    const networkData = PythagorasProject.networks[networkId] 
      try {
       const pythagorasProject = web3.eth.Contract(PythagorasProject.abi, networkData.address)
              const dBankAddress = PythagorasProject.networks[networkId].address
              const dbankbalance = await web3.eth.getBalance(dBankAddress)
              const userbalance = await pythagorasProject.methods.etherBalanceOf(this.state.account).call()
              this.setState({ userbalance: web3.utils.fromWei(userbalance.toString(), 'Ether') })
              this.setState({ dbankbalance: web3.utils.fromWei(dbankbalance.toString(), 'Ether') })
              this.setState({ pythagorasProject: pythagorasProject, dBankAddress: dBankAddress})

      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }

    } else {
      window.alert('Please install MetaMask')
    }
  }


  async deposit(amount) {
    if(this.state.pythagorasProject!=='undefined'){
      try{
        await this.state.pythagorasProject.methods.deposit().send({value: amount.toString(), from: this.state.account})
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  async withdraw(amount) {
    if(this.state.pythagorasProject!=='undefined'){
      try{
        await this.state.pythagorasProject.methods.withdraw(amount.toString()).send({ from: this.state.account})
      } catch (e) {
        console.log('Error, withdraw: ', e)
      }
    }
  }



  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      pythagorasProject: null,
      balance: 0,
      dBankAddress: null,
      dbankbalance:0,
      userbalance:0
    }
  }

  render() {
    return (
      <div className="container3">
      <p>&nbsp;</p>
          <h4>User wallet</h4>
          <div style={{ borderTop: "2px solid #000000 ", marginLeft: 0, marginRight: 0 }}></div>
          <h5>For deposit and withdraw money from the fund please use the tools below</h5>
          <p>(Only people that have money in the fund can make a post or vote)</p>
          
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                  <br></br>
                    How much do you want to deposit?
                    <br></br>
                    (min. amount is 0.01 ETH)
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmount.value
                      amount = amount * 10**18 //convert to wei
                      this.deposit(amount)
                    }}>
                      <div className='form-group mr-sm-2'>
                      <br></br>
                        <input
                          id='depositAmount'
                          step="0.01"
                          type='number'
                          ref={(input) => { this.depositAmount = input }}
                          className="form-control form-control-md"
                          placeholder='amount...'
                          required />
                      </div>
                      <button type='submit' className='btn btn-primary'>Deposit</button>
                    </form>
                  </div>
                </Tab>

                <Tab eventKey="withdraw" title="Withdraw">
                  <div>
                  <br></br>
                    How much do you want to withdraw?
                    <br></br>
                    (If there is a voting in place withdraws are not alowed)
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.withdrawAmount.value
                      amount = amount * 10**18 //convert to wei
                      this.withdraw(amount)
                    }}>
                      <div className='form-group mr-sm-2'>
                      <br></br>
                        <input
                          id='withdrawAmount'
                          step="0.01"
                          type='number'
                          ref={(input) => { this.withdrawAmount = input }}
                          className="form-control form-control-md"
                          placeholder='amount...'
                          required />
                      </div>
                      <button type='submit' className='btn btn-primary'>Withdraw</button>
                    </form>
                  </div>
                </Tab>

              </Tabs>
              </div>
            </main>
          </div>
          <p>&nbsp;</p>
          <h6>My balance: {this.state.userbalance} ETH</h6>
          <h6>My Address:</h6>
          <small> {this.state.account}</small>
        </div>
    );
  }
}

export default Dbank;