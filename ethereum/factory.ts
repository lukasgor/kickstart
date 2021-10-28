import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const ropsten_factory_address = '0xF90B4A0aa7c66dd4719708a3AD3c0b0128d299C9';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.FACTORY_ADDRESS || ropsten_factory_address,
);

export default instance;
