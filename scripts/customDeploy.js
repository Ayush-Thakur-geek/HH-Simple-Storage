const { ethers, run, network } = require("hardhat")
const { env } = require("dotenv")
// const fs = require("fs")

async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    const simpleStorage = await simpleStorageFactory.deploy()
    console.log("Deploying contracts...")
    console.log(`Deploying contract to: ${simpleStorage.target}`)
    console.log(network.config)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }

    const currentVal = await simpleStorage.retrieve()
    console.log(`Current value: ${currentVal}`)
    const transactionResponse = await simpleStorage.store(7)
    const transcationReciept = await transactionResponse.wait(1)
    const updatedVal = await simpleStorage.retrieve()
    console.log(`Updated value: ${updatedVal}`)
}

// async function verify(contractAddress, args) {
//     console.log("Verifying contract...")
//     try {
//         await run("verify:verify", {
//             address: contractAddress,
//             constructorArguments: args,
//         })
//     } catch (error) {
//         if (error.message.toLowerCase().includes("already verified")) {
//             console.log("Already Verified")
//         } else {
//             console.error(error)
//         }
//     }
// }

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.error(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
