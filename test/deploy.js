const { ethers } = require('hardhat')
const { assert, expect } = require('chai')

describe('SimpleStorage', function () {
  let accounts
  let ERC20Factory
  let erc20
  const costToReveal = '10'
  const initialSupply = '1000000'
  beforeEach(async function() {
    // get all our users first 
    accounts = await ethers.getSigners()

    ERC20Factory = await ethers.getContractFactory('BabyReveal')
    erc20 = await ERC20Factory.deploy(initialSupply, costToReveal)
    await erc20.deployed()
  })
  it('Deployer should have 1 million tokens.', async function () {
    const balance = await erc20.balanceOf(accounts[0].address)
    assert.equal(balance.toString(), initialSupply)
  })
  it('Cost to reveal should be 10.', async function () {
    const cost = await erc20.costToReveal()
    assert.equal(cost.toString(), costToReveal)
  })
  it('Should transfer 100 tokens from deployer to account 1', async function () {
    await erc20.transfer(accounts[1].address, 100)
    const balance = await erc20.balanceOf(accounts[1].address)
    assert.equal(balance.toString(), '100')
  })
})