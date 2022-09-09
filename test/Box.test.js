// test/Box.test.js - Open Zeppelin test-helpers version using Truffle plugin
// Load dependencies first
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployProxy, upgradeProxy } = require("@openzeppelin/hardhat-upgrades");

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const Box = artifacts.require("Box");
const BoxV2 = artifacts.require("BoxV2");

// Start test block
contract("Box", function ([owner, other]) {
    // Use large integers ('big numbers);
    const value = new BN("42");

    beforeEach(async () => {
        this.box = await Box.new({ from: owner });
    });

    // Test case
    it("retrieve() returns a value previously stored", async () => {
        // Stores a value
        await this.box.store(value, { from: owner });

        // Use large integer comparisons
        expect(await this.box.retrieve()).to.be.bignumber.equal(value);
    });

    it("store() emits an event", async () => {
        const receipt = await this.box.store(value, { from: owner });

        // Test that a ValueChanged event was emitted with the new value
        expectEvent(receipt, "ValueChanged", { value: value });
    });

    /*
    it("non owner cannot store a value", async () => {
        // Test a transaction reverts
        await expectRevert(
            this.box.store(value, { from: other }),
            "Ownable: caller is not the owner"
        );
    });
    */

    it("works before and after upgrading", async function () {
        const instance = await upgrades.deployProxy(Box, [value]);
        assert.strictEqual(await instance.retrieve(), value);

        await upgrades.upgradeProxy(instance.address, BoxV2);
        assert.strictEqual(await instance.retrieve(), value);
    });
});
