const Puppy = artifacts.require('Puppy.sol');

const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('Puppy Contract', async (accounts) => {


    it('Should correctly initialize constructor of Puppy token Contract', async () => {

        this.tokenhold = await Puppy.new(accounts[0],{ gas: 600000000 });

    });

    it('Should check a name of a token', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, "Puppy");

    });

    it('Should check a symbol of a token', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, "PUPPY");

    });

    it('Should check a decimal of a token', async () => {

        let decimals = await this.tokenhold.decimals.call();
        assert.equal(decimals, 18);

    });

    it('Should check a balance of a token contract', async () => {

        let owner = await this.tokenhold.balanceOf.call(this.tokenhold.address);
        assert.equal(owner.toNumber()/10**18,0);

    });

    it('Should check if contract is paused or not', async () => {

        let paused = await this.tokenhold.paused.call();
        assert.equal(paused,false);

    });

    it('Should Not be able to pause the contract by non owner account', async () => {
       try {
        await this.tokenhold.pause({from : accounts[3]});
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should be able to pause the contract', async () => {

        await this.tokenhold.pause({from : accounts[0]});

    });

    it('Should check if contract is paused or not after pause', async () => {

        let paused = await this.tokenhold.paused.call();
        assert.equal(paused,true);

    });

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve accounts[1] to spend specific tokens of accounts[4]", async () => {

        this.tokenhold.approve(accounts[1], web3.utils.toHex(50 * 10 ** 9), { from: accounts[4] });

    });

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 50000000000, "allowance is wrong when approve");

    });

    it("should increase Approve accounts[4] to spend specific tokens of accounts[1]", async () => {

        this.tokenhold.increaseAllowance(accounts[1], web3.utils.toHex(50 * 10 ** 9), { from: accounts[4] });

    });

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 100000000000, "allowance is wrong when approve");

    });    

    it("should decrease Approve accounts[4] to spend specific tokens of accounts[1]", async () => {

        this.tokenhold.decreaseAllowance(accounts[1], web3.utils.toHex(50 * 10 ** 9), { from: accounts[4] });

    });

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 50000000000, "allowance is wrong when approve");

    });

    it("should decrease Approve accounts[4] to spend specific tokens of accounts[1]", async () => {

        this.tokenhold.decreaseAllowance(accounts[1], web3.utils.toHex(500 * 10 ** 9), { from: accounts[4] });

    });    

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve accounts[1] to spend specific tokens of accounts[4] agin", async () => {

        this.tokenhold.approve(accounts[1], web3.utils.toHex(50 * 10 ** 9), { from: accounts[4] });

    });

    it("should be able to mint tokens ", async () => {

        this.tokenhold.mint(accounts[4],web3.utils.toHex(50000000000),{from: accounts[0] });

    });

    it('should not be able to mint tokens by non owner account', async () => {

        try {
            this.tokenhold.mint(accounts[4]web3.utils.toHex(50000000000),{from: accounts[1] });
         } catch (error) {
             var error_ = 'Returned error: VM Exception while processing transaction: revert';
             assert.equal(error.message, error_, 'Reverted ');
         }
 
     });


    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 50000000000, "allowance is wrong when approve");

    });

    it("should be able to transferfrom accounts[4] to accounts[1]", async () => {

        this.tokenhold.transferFrom(accounts[4],accounts[1],web3.utils.toHex(50000000000),{from: accounts[1] });

    });

    it("should check approval by accounts 4 to accounts 1 to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[1]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });


    it('Should check a balance of a beneficiary of accounts[4] after sending all tokens', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[4]);
        assert.equal(owner.toNumber(),50000000000);

    });


})




