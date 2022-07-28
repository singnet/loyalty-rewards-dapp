import { WalletNotConnectedError } from 'utils/errors';
import { useActiveWeb3React } from './web3Hooks';
import { AIRDROP_SITE_STRING } from 'utils/airdropWindows';

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<any> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const signer = await library.getSigner();

    const chainId = await signer.getChainId();
    const blockNumber = await library.getBlockNumber();

    const [airdropId, airdropWindowId, cardanoAddress] = values;

    const domain = {
      name: `${AIRDROP_SITE_STRING}`,
      version: '1',
      chainId,
    };

    const valueType = {
      AirdropSignatureTypes: [
        { name: 'airdropId', type: 'uint256' },
        { name: 'airdropWindowId', type: 'uint256' },
        { name: 'blockNumber', type: 'uint256' },
        { name: 'walletAddress', type: 'address' },
        { name: 'cardanoAddress', type: 'string' },
      ],
      Mail: [{ name: 'Airdrop', type: 'AirdropSignatureTypes' }],
    };

    const value = {
      Airdrop: {
        airdropId: airdropId,
        airdropWindowId: airdropWindowId,
        blockNumber: blockNumber,
        walletAddress: account,
        cardanoAddress: cardanoAddress,
      },
    };

    const signature = await signer._signTypedData(domain, valueType, value);
    const newSignature = signature.slice(2);
    console.log('useEthSign:signature', signature);
    return { signature: newSignature, blockNumber };
  };

  const getSignature = async (values): Promise<any> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const signer = await library.getSigner();

    const chainId = await signer.getChainId();
    // const blockNumber = await library.getBlockNumber();

    const [airdropWindowId, registrationId] = values;

    const domain = {
      name: `${AIRDROP_SITE_STRING}`,
      version: '1',
      chainId,
    };

    const valueType = {
      AirdropSignatureTypes: [
        { name: 'airdropWindowId', type: 'uint256' },
        { name: 'receipt', type: 'string' },
      ],
      Mail: [{ name: 'Airdrop', type: 'AirdropSignatureTypes' }],
    };

    const value = {
      Airdrop: {
        airdropWindowId: airdropWindowId,
        receipt: registrationId,
      },
    };

    const signature = await signer._signTypedData(domain, valueType, value);
    const newSignature = signature.slice(2);
    return { signature: newSignature };
  };

  return {
    sign,
    getSignature,
  };
};
