import { WalletNotConnectedError } from 'utils/errors';
import { useActiveWeb3React } from './web3Hooks';

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<any> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const signer = await library.getSigner();

    const chainId = await signer.getChainId();
    const blockNumber = await library.getBlockNumber();

    const [airdropId, airdropWindowId] = values;

    const domain = {
      name: 'Nunet Airdrop',
      version: '1',
      chainId,
    };

    const valueType = {
      AirdropSignatureTypes: [
        { name: 'airdropId', type: 'uint256' },
        { name: 'airdropWindowId', type: 'uint256' },
        { name: 'blockNumber', type: 'uint256' },
        { name: 'walletAddress', type: 'address' },
        { name: 'cardanoAddress', type: 'string'},
      ],
      Mail: [{ name: 'Airdrop', type: 'AirdropSignatureTypes' }],
    };
    const cardano_address = 'addr_test1qqera830frgpvw9f0jj2873lwe8nd8vcsf0q0ftuqqgd9g8ucaczw427uq8y7axn2v3w8dua87kjgdgurmgl38vd2hysk4dfj9';

    const value = {
      Airdrop: {
        airdropId: airdropId,
        airdropWindowId: airdropWindowId,
        blockNumber: 12432452,
        walletAddress: account,
        cardanoAddress: cardano_address
      },
    };

    const signature = await signer._signTypedData(domain, valueType, value);
    console.log('useEthSign:signature', signature);
    return { signature, blockNumber };
  };

  return {
    sign,
  };
};
