const { ethers, run, network } = require('hardhat')

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Contract deployed to address: ${simpleStorage.address}`)

  const networkIsGoerli = network.config.chainId === 5
  const etherscanApiKeyExists = process.env.ETHERSCAN_API_KEY 
  if (networkIsGoerli && etherscanApiKeyExists) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log(`New value: ${newValue}`)
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