import React, { Component , useEffect }  from 'react';
import Web3 from 'web3' ;
import Identicon from 'identicon.js';
import './App.css';
import PythagorasProject from '../abis/PythagorasProject.json'
import Navbar from './Navbar'
import Main from './Main'
import Pinakas from './Pinakas'
import Dbank from './Dbank'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'



class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask')
    }
  }

  async loadBlockchainData() {
    const web3 =window.web3
    //load accounts 
    const accounts =await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
   
       //Network id pythagoras
    const networkId = await web3.eth.net.getId()
    const networkData = PythagorasProject.networks[networkId] 



    if(networkData) {
      const pythagorasProject = web3.eth.Contract(PythagorasProject.abi, networkData.address)
              const dBankAddress = PythagorasProject.networks[networkId].address
              const dbankbalance = await web3.eth.getBalance(dBankAddress)
              const userbalance = await pythagorasProject.methods.etherBalanceOf(this.state.account).call()
              const isitauser = await pythagorasProject.methods.isDeposited(this.state.account).call()
              this.setState({isitauser})
              this.setState({ userbalance: web3.utils.fromWei(userbalance.toString(), 'Ether') })
              this.setState({ dbankbalance: web3.utils.fromWei(dbankbalance.toString(), 'Ether') })
              this.setState({ pythagorasProject: pythagorasProject, dBankAddress: dBankAddress})
      const postCount = await pythagorasProject.methods.postCount().call()
      this.setState({postCount})
      //load posts
      for (var i=1; i<= postCount; i++) {
        const post = await pythagorasProject.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      this.setState({
        posts: this.state.posts.sort((a,b) => b.upvotes - a.upvotes )
      })
      this.setState({ loading: false})
    } else {
      window.alert('PythagorasProject contract not deployed to detected network. ')
    }
  }
   

   

    createPost(content, invest, amount) {
     this.setState({ loading: true })
     this.state.pythagorasProject.methods.createPost(content, invest, amount).send({ from: this.state.account })
     .once('receipt', (receipt) => {
      this.setState({ loading: false })
     })
    }


    Upvote(id, upvotes) {
     this.setState({ loading: true })
     this.state.pythagorasProject.methods.Upvote(id).send({ from: this.state.account, value: upvotes })
     .once('receipt', (receipt) => {
      this.setState({ loading: false })
     })
    }

    Downvote(id, downvotes) {
     this.setState({ loading: true })
     this.state.pythagorasProject.methods.Downvote(id).send({ from: this.state.account, value: downvotes })
     .once('receipt', (receipt) => {
      this.setState({ loading: false })
     })
   }
  

 constructor(props) {
    super(props)
    this.state = {
      account: '',
      pythagorasProject: null,
      postCount: 0,
      posts: [],
      loading: true,
      pythagorasProject: null,
      balance: 0,
      dBankAddress: null,
      dbankbalance:0,
      userbalance:0,
      isitauser: false
    }

    this.createPost = this.createPost.bind(this)
    this.Upvote = this.Upvote.bind(this)
    this.Downvote = this.Downvote.bind(this)
  }

  render() {
    return (

      <div className="container2">
      <p>&nbsp;</p>
       <h1><center>Democratize Hedge Fund </center></h1>
       <h3><center>Fund's Value: {this.state.dbankbalance} </center></h3>
       <h6><center>0$ deposit,withdraw comision/The fund is, and always will be FREE!</center></h6>
       <h6><center>This is a tool for the everyday person to fight the big hedge funds and crypto whales.</center></h6>
       <h6><center>Contract address: {this.state.dBankAddress} </center></h6>
         <div style={{ borderTop: "2px solid #000000 ", marginLeft: 0, marginRight: -10 }}></div> 
         <Navbar account={this.state.account} />
            { this.state.loading
               ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <Main
                 posts={this.state.posts}
                 createPost={this.createPost}
                 Upvote={this.Upvote}
                 Downvote={this.Downvote}
           />
         }
      </div>

    );
  }
}

export default App;

