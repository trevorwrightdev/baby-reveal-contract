const { ethers, run, network } = require('hardhat')

async function main() {
  const args = [1000000, 10]

  const BabyRevealFactory = await ethers.getContractFactory('BabyReveal')
  console.log('Deploying contract...')
  const babyReveal = await BabyRevealFactory.deploy(...args)
  await babyReveal.deployed()
  console.log(`Contract deployed to address: ${babyReveal.address}`)

  const networkIsGoerli = network.config.chainId === 5
  const etherscanApiKeyExists = process.env.ETHERSCAN_API_KEY 
  if (networkIsGoerli && etherscanApiKeyExists) {
    await babyReveal.deployTransaction.wait(6)
    await verify(babyReveal.address, args)
  }
}

async function verify(contractAddress, args) {
  console.log('Verifying contract...')

  try {
    await run("verify:verify", { 
      address: contractAddress,
      constructorArguments: args
    }) 
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Contract already verified.')
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })