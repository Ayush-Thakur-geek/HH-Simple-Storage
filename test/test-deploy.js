const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with favourite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0
        assert.equal(currentValue.toString(), expectedValue)
    })
})
