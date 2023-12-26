const { ethers } = require("hardhat")
const fs = require("fs-extra")
const { env } = require("dotenv")

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY_SALT,
    )
    console.log(encryptedJsonKey)
    try {
        fs.writeFileSync("./encrypted.json", encryptedJsonKey)
    } catch (err) {
        console.error("Error writing file:", err)
    }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
