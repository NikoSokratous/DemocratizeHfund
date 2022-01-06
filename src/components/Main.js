import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="post" title="Create a Vote">
                  <div>
                  <br></br>
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.postContent.value
                  const invest = this.postInvest.value
                  const amount = this.postAmount.value
                  this.props.createPost(content, invest, amount)
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder="Where and why should the fund invest?"
                    required />
                    <input
                    id="postInvest"
                    type="text"
                    ref={(input) => { this.postInvest = input }}
                    className="form-control"
                    placeholder="Coin address"
                    required />
                    <input
                    id="postAmount"
                    type="text"
                    ref={(input) => { this.postAmount = input }}
                    className="form-control"
                    placeholder="How much should the fund invest in this asset?"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Share</button>
              </form>
              </div>
                </Tab>

              </Tabs>
              <p>&nbsp;</p>
              { this.props.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p><i>Where and why should the fund invest:</i><font color="Blue"> {post.content}</font></p>
                        <p><i>The address in which the investment will contact: </i><font color="Blue">{post.invest}</font></p>
                        <p><i>This is the amount that will be invest:</i><font color="Blue"> {post.amount} ETH</font></p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Up: {window.web3.utils.fromWei(post.upvotes.toString(), 'Ether')}   
                          / Down: {window.web3.utils.fromWei(post.downvotes.toString(), 'Ether')} 
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let downvotes = window.web3.utils.toWei('1', 'gwei')
                            console.log(event.target.name, downvotes)
                            this.props.Downvote(event.target.name, downvotes)
                          }}
                        >
                          Down
                        </button>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let upvotes = window.web3.utils.toWei('1', 'gwei')
                            console.log(event.target.name, upvotes)
                            this.props.Upvote(event.target.name, upvotes)
                          }}
                        >
                          Up
                          </button>
                        
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

}

export default Main;

