import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

export const getWeb3 = async () => {
  const provider = await detectEthereumProvider();
  if (!provider) throw new Error('Please install MetaMask');
  await provider.request({ method: 'eth_requestAccounts' });
  return new Web3(provider);
};
