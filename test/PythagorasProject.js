const PythagorasProject = artifacts.require('./PythagorasProject.sol');

require('chai')
   .use(require('chai-as-promised'))
   .should()

contract('PythagorasProject',([deployer, author, tipper]) => {
  let pythagorasProject

  before(async() => {
    pythagorasProject = await PythagorasProject.deployed()
  })

  describe('deployment',async () => {
 	 it('deploys successfully', async () => {
     const address = await pythagorasProject.address
     assert.notEqual(address, 0x0)
     assert.notEqual(address, '')
     assert.notEqual(address, null)
     assert.notEqual(address, undefined)
 	 })

 	 it('has a name', async () => {
 		 const name =await pythagorasProject.name()
 		 assert.equal(name, 'PythagorasProject')
 	 })
  })

  describe('post', async () => {
  	let result, postCount

    before(async() => {
      result = await pythagorasProject.createPost('this is a post', {from: author}) 
      postCount = await pythagorasProject.postCount()
    })

  	it('creates posts', async () =>{
       // sucess
  	   assert.equal(postCount, 1)
  	   const event = result.logs[0].args
  	   assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
  	   assert.equal(event.content, 'this is a post', 'content is correct')
  	   assert.equal(event.tipAmount, '0', 'tip amount is correct')
  	   assert.equal(event.author, author, 'author is correct')
  	   //fail
  	   await pythagorasProject.createPost('', {from: author}).should.be.rejected; 
  	})

  	it('list posts', async () =>{
  		const post = await pythagorasProject.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.content, 'this is a post', 'content is correct')
      assert.equal(post.tipAmount, '0', 'tip amount is correct')
      assert.equal(post.author, author, 'author is correct')
  	})

  	it('allow users to tip posts', async () =>{
      //check author balance before
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

  		result = await pythagorasProject.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })
      // sucess
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'this is a post', 'content is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      //check author balance after
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      //tip amount 
      let tipAmount
      tipAmount =  web3.utils.toWei('1', 'Ether')
      tipAmount = new web3.utils.BN(tipAmount)

      //check if the sum up
      const expectedBalance = oldAuthorBalance.add(tipAmount)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      //FAILURE: tries to tip a post that does not exist
      await pythagorasProject.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

  	})
  })
})