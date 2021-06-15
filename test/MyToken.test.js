const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async ([deployerAccount, recipient, anotherAccounts]) => {

    let contractInstance;
    
    before(async () => {
        contractInstance = await Token.deployed();
    })

    describe("deployment", async () => {

        it("all tokens should be in my account", async () => {
            let totalSupply = await contractInstance.totalSupply();
            expect(contractInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);  
        })
    })

    describe("token transfer", async () => {

        beforeEach(async () => {
            contractInstance = await Token.new("100000");
        })

        it("is possible to send tokens between accounts", async () => {
    
            let sendTokens = 10;
            
            let totalSupply = await contractInstance.totalSupply();
    
            expect(contractInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

            await contractInstance.transfer(recipient, sendTokens);
            
            let recipientBalance = await contractInstance.balanceOf(recipient);
            let deployerBalance = await contractInstance.balanceOf(deployerAccount);
            
            expect(deployerBalance).to.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
            expect(recipientBalance).to.be.a.bignumber.equal(new BN(sendTokens));
    
        })
    
        it("is not possible to send tokens more than total supply", async () => {
    
            const initialBalance = await contractInstance.balanceOf(deployerAccount);
            
    
        })
    })


})