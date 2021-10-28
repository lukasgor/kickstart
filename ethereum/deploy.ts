require('dotenv').config();
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import compiledFactory from './build/CampaignFactory.json';

const provider = new HDWalletProvider(
  process.env.DEPLOY_ACC_MNEMONIC,
  process.env.RPC_URL,
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: 1000000, gasPrice: '5000000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};

deploy();
