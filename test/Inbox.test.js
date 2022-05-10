// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

// create web3 instance to connect to ganache using ganache provider
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
                .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MESSAGE] })
                .send({ from: accounts[0], gas: '1000000' });
    //console.log(inbox);
});

describe('Inbox', () => {
    it('should deploy a contract', () => {        
        assert.ok(inbox.options.address);
    });

    it('should have a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('should be able to change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});
