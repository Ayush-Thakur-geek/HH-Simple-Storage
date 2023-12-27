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
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async () => {
        const newVal = 5
        const transaction = await simpleStorage.store(newVal)
        await transaction.wait()
        const updatedVal = await simpleStorage.retrieve()
        assert.equal(newVal, updatedVal)
    })

    it("Should assign favourite number to the name", async () => {
        const fav = 7
        const name = "Bob"
        await simpleStorage.addPerson(name, fav)
        const favNumber = await simpleStorage.nameToFavoriteNumber(name)
        assert.equal(favNumber, fav)
    })
})
