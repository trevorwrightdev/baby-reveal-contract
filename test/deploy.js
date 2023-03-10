const { ethers } = require('hardhat')
const { assert, expect } = require('chai')

describe('BabyReveal', function () {
  let accounts
  let ERC20Factory
  let erc20
  const costToReveal = '10'
  const initialSupply = '1000000'
  beforeEach(async function() {
    // get all our users first 
    accounts = await ethers.getSigners()

    ERC20Factory = await ethers.getContractFactory('BabyReveal')
    erc20 = await ERC20Factory.deploy(initialSupply, costToReveal, '0xa5DE7A396F985Ee9eD808F7B6373002c2C34282F')
    await erc20.deployed()
  })
  it('Deployer should have 1 million tokens.', async function () {
    const balance = await erc20.balanceOf(accounts[0].address)
    assert.equal(balance.toString(), initialSupply)
  })
  it('Should transfer 100 tokens from deployer to account 1', async function () {
    await erc20.transfer(accounts[1].address, 100)
    const balance = await erc20.balanceOf(accounts[1].address)
    assert.equal(balance.toString(), '100')
  })
  it('Address 1 should be able to reveal the baby', async function () {
    // transferring 100 tokens to account 1
    await erc20.transfer(accounts[1].address, 100)
    const balance = await erc20.balanceOf(accounts[1].address)
    assert.equal(balance.toString(), '100')

    const randomTokenId = '32'

    // running reveal baby
    await erc20.connect(accounts[1]).revealBaby(randomTokenId)
    const events = await erc20.queryFilter(
      erc20.filters.Reveal(randomTokenId)
    )
    const tokenId = Number(events[0].args[0])
    assert.equal(tokenId.toString(), randomTokenId)
  })
  it('Address 1 should have a balance of 90.', async function () {
    // transferring 100 tokens to account 1
    await erc20.transfer(accounts[1].address, 100)
    const balance = await erc20.balanceOf(accounts[1].address)
    assert.equal(balance.toString(), '100')

    const randomTokenId = '32'

    // running reveal baby
    await erc20.connect(accounts[1]).revealBaby(randomTokenId)
    const newBalance = await erc20.balanceOf(accounts[1].address)
    assert.equal(newBalance.toString(), '90')
  })
})