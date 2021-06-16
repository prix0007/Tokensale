const Token = artifacts.require("MyToken");


const chai = require("./setupchai.js");

const BN = web3.utils.BN;

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Token Test", async ([deployerAccount, recipient, anotherAccounts]) => {

    let contractInstance;
    
    beforeEach(async () => {
        contractInstance = await Token.new(process.env.TOTAL_SUPPLY);
    })

    describe("deployment", async () => {

        it("all tokens should be in my account", async () => {
            let totalSupply = await contractInstance.totalSupply();
            return expect(contractInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);  
        })
    })

    describe("token transfer", async () => {

        it("is possible to send tokens between accounts", async () => {
    
            let sendTokens = 10;
            
            let totalSupply = await contractInstance.totalSupply();
    
            expect(contractInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

            await contractInstance.transfer(recipient, sendTokens);
            
            let recipientBalance = await contractInstance.balanceOf(recipient);
            let deployerBalance = await contractInstance.balanceOf(deployerAccount);
            
            expect(deployerBalance).to.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
            return expect(recipientBalance).to.be.a.bignumber.equal(new BN(sendTokens));
    
        })
    
        it("is not possible to send tokens more than total supply", async () => {
    
            const initialBalance = await contractInstance.balanceOf(deployerAccount);
            
            expect(contractInstance.transfer(recipient, new BN(initialBalance+1))).to.eventually.be.rejected;
    
            return expect(contractInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(initialBalance);

        })
    })


})