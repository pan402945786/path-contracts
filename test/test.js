const Web3 = require('web3');
const ethers = require('ethers');
const BigNumber = require('bignumber.js');
const uniswapABI = require('./uniswapv2ABI.json');

exports.getData = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/e3ccdfccabb34347aa591c6acdbc7743")); 
    const ROUTER_ADDRESS = "0x3a0d44eC842BCb7e5ba2a88c288073241043f302";
    const ROUTE_ABI = require('../build/contracts/GeneralPathProxy.json');
    const routerContract = new web3.eth.Contract(ROUTE_ABI.abi, ROUTER_ADDRESS);
    // const routerContract = new web3.eth.Contract(uniswapABI, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
    // const targetData = "0xab834bab000000000000000000000000dd54d660178b28f6033a953b0e55073cfa7e374400000000000000000000000076336d2903e8f6d62cc3f5d05283108e3d2785e0000000000000000000000000947a776bbb8dce6f8c175a19e2b869371e639ff9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000045b594792a5cdc008d0de1c1d69faa3d16b3ddc100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dd54d660178b28f60…000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    // const data = await routerContract.methods.swapExactETHForTokens('100000000000000000', ['0xc778417E063141139Fce010982780140Aa0cD5Ab', '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735'], '0x76336D2903E8F6d62Cc3F5d05283108e3D2785e0', 1648286732).encodeABI();
    const data = await routerContract.methods.swap(
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        '110000000000000000',
        "0x7ff36ab5000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000076336d2903e8f6d62cc3f5d05283108e3d2785e000000000000000000000000000000000000000000000000000000000623edc0c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c778417e063141139fce010982780140aa0cd5ab000000000000000000000000c7ad46e0b8a400bb3c915120d284aafba8fc4735",
        1648286732,
        false
    ).encodeABI();
    // const data = await routerContract.methods.addWhiteList('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D').encodeABI();
    console.log(data);
    // return;

    // 调通买nft合约
    const transferTransaction = await web3.eth.accounts.signTransaction(
        {
            "from": "0x76336D2903E8F6d62Cc3F5d05283108e3D2785e0",
            "to": "0x3a0d44eC842BCb7e5ba2a88c288073241043f302",
            "value": "110000000000000000",
            "gas": 470000,
            "data": data
        }
        ,        
        "" // private key 
    );
    // const transferTransaction = await web3.eth.accounts.signTransaction(
    //     {
    //         "from": "0x76336D2903E8F6d62Cc3F5d05283108e3D2785e0",
    //         "to": "0x3a0d44eC842BCb7e5ba2a88c288073241043f302",
    //         "value": "110000000000000000",
    //         "gas": 470000,
    //         "data": data
    //     }
    //     ,        
    //     "" // private key 
    // );
    // Send Tx and Wait for Receipt
    const transferReceipt = await web3.eth.sendSignedTransaction(
        transferTransaction.rawTransaction
    );
    console.log("finish", transferTransaction);
    console.log(`transfer receipt: ${JSON.stringify(transferReceipt)}`);
}

const testExecutionPrice = async () => {
    await this.getData();
}

testExecutionPrice()