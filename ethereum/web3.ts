import Web3 from 'web3';

let web3;
const ROPSTEN_RPC_URL =
  'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    process.env.RPC_URL || ROPSTEN_RPC_URL,
  );
  web3 = new Web3(provider);
}

export default web3;
