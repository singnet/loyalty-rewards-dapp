import { useState, useEffect } from 'react';
import toLower from 'lodash/toLower';
import isNil from 'lodash/isNil';
import {
  Address,
  AssetName,
  Assets,
  BigNum,
  LinearFee,
  MultiAsset,
  ScriptHash,
  Transaction,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionWitnessSet,
  Value,
} from '@emurgo/cardano-serialization-lib-asmjs';
import AssetFingerprint from '@emurgo/cip14-js';

let injectedWallet;

const protocolParams = {
  linearFee: {
    minFeeA: '44',
    minFeeB: '155381',
  },
  minUtxo: '34482',
  poolDeposit: '500000000',
  keyDeposit: '2000000',
  maxValSize: 5000,
  maxTxSize: 16384,
  priceMem: 0.0577,
  priceStep: 0.0000721,
  coinsPerUtxoWord: '34482',
};

const useInjectableWalletHook = (supportingWallets) => {
  const [supportedWallets, setSupportedWallets] = useState([]);

  const HexToBuffer = (string) => {
    return Buffer.from(string, 'hex');
  };

  const HexToAscii = (value) => {
    return HexToBuffer(value).toString('ascii');
  };

  const getSupportedWallets = (cardano) => {
    const wallets = [];

    supportingWallets.map((wallet) => {
      const cardanoWallet = cardano[toLower(wallet)];
      const isWalletAvailable = isNil(cardanoWallet);
      if (!isWalletAvailable) {
        wallets.push({ ...cardanoWallet, walletIdentifier: wallet });
      }
    });

    console.log('Supported wallets: ', wallets);

    setSupportedWallets(wallets);

    return wallets.length;
  };

  const detectCardanoInjectableWallets = () => {
    try {
      const cardano = window?.cardano;

      if (isNil(cardano)) {
        return false;
      }

      const isWalletsAvailable = getSupportedWallets(cardano);
      return isWalletsAvailable;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  };

  const getNetworkId = async () => {
    try {
      const networkId = await injectedWallet.getNetworkId();
      return networkId;
    } catch (error) {
      console.log('Error on getNetworkId: ', error);
      throw error;
    }
  };

  const connectWallet = async (walletName) => {
    try {
      const connectingWallet = toLower(walletName);
      injectedWallet = await window.cardano[connectingWallet].enable();
      const currentNetworkId = await getNetworkId();
      if (Number(currentNetworkId) !== Number(process.env.NEXT_PUBLIC_CARDANO_NETWORK_ID)) {
        throw new Error('Invalid network id selected');
      }

      return injectedWallet;
    } catch (error) {
      console.log('Error on connectWallet: ', error);
      throw error;
    }
  };

  useEffect(() => {
    detectCardanoInjectableWallets();
  }, []);

  const getTokensAndBalance = async (walletIdentifier) => {
    try {
      if (isNil(injectedWallet)) {
        await connectWallet(walletIdentifier);
      }

      const raw = await injectedWallet.getBalance();
      const value = Value.from_bytes(Buffer.from(raw, 'hex'));
      const assets = [];

      if (value.multiasset()) {
        const multiAssets = value.multiasset()?.keys();
        const multiAssetsLength = multiAssets?.len();
        for (let j = 0; j < multiAssetsLength; j++) {
          const policy = multiAssets?.get(j);
          const policyAssets = value.multiasset()?.get(policy);
          const assetNames = policyAssets?.keys();
          const assetNameLength = assetNames?.len();
          for (let k = 0; k < assetNameLength; k++) {
            const policyAsset = assetNames?.get(k);
            const quantity = policyAssets?.get(policyAsset);
            const asset =
              Buffer.from(policy.to_bytes(), 'hex').toString('hex') +
              Buffer.from(policyAsset.name(), 'hex').toString('hex');
            const rawPolicy = asset.slice(0, 56);
            const rawAssetName = asset.slice(56);

            const fingerprint = AssetFingerprint.fromParts(
              Buffer.from(rawPolicy, 'hex'),
              Buffer.from(rawAssetName, 'hex')
            ).fingerprint();

            assets.push({
              unit: asset,
              quantity: quantity?.to_str(),
              policy: rawPolicy,
              name: HexToAscii(rawAssetName),
              fingerprint,
            });
          }
        }
      }

      return assets;
    } catch (error) {
      console.log('Error on getTokensAndBalance: ', JSON.stringify(error));
      throw error;
    }
  };

  const getBalanceByPolicyScriptId = async (walletIdentifier, policyScriptId) => {
    const balances = await getTokensAndBalance(walletIdentifier);
    const balance = balances.find((balance) => balance.policy === policyScriptId);
    return balance;
  };

  const getUsedAddresses = async () => {
    try {
      const raw = await injectedWallet.getUsedAddresses();
      const usedAddresses = raw.map((address) => {
        return Address.from_bytes(Buffer.from(address, 'hex')).to_bech32();
      });

      console.log('Used addresses: ', usedAddresses);

      return usedAddresses[0];
    } catch (error) {
      console.log('Error on getUsedAddresses: ', JSON.stringify(error));
      throw error;
    }
  };

  const getRewardAddresses = async () => {
    try {
      const raw = await injectedWallet.getRewardAddresses();
      const rewardAddressess = raw.map((address) => {
        return Address.from_bytes(Buffer.from(address, 'hex')).to_bech32();
      });

      console.log('rewardAddressess: ', rewardAddressess);
    } catch (error) {
      console.log('Error on getRewardAddresses: ', JSON.stringify(error));
    }
  };

  const getUnusedAddresses = async () => {
    try {
      const raw = await injectedWallet.getUnusedAddresses();
      const unusedAddressess = raw.map((address) => {
        return Address.from_bytes(Buffer.from(address, 'hex')).to_bech32();
      });

      console.log('unusedAddressess: ', unusedAddressess);
    } catch (error) {
      console.log('Error on getUnusedAddresses: ', JSON.stringify(error));
    }
  };

  const getChangeAddress = async () => {
    try {
      const raw = await injectedWallet.getChangeAddress();

      await getUsedAddresses();
      await getRewardAddresses();
      await getUnusedAddresses();

      const changeAddress = Address.from_bytes(Buffer.from(raw, 'hex')).to_bech32();
      console.log('Wallet address: ', changeAddress);
      return changeAddress;
    } catch (error) {
      console.log('Error on getChangeAddress: ', error);
      throw error;
    }
  };

  const initTransactionBuilder = async () => {
    const txBuilder = TransactionBuilder.new(
      TransactionBuilderConfigBuilder.new()
        .fee_algo(
          LinearFee.new(
            BigNum.from_str(protocolParams.linearFee.minFeeA),
            BigNum.from_str(protocolParams.linearFee.minFeeB)
          )
        )
        .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
        .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
        .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
        .max_value_size(protocolParams.maxValSize)
        .max_tx_size(protocolParams.maxTxSize)
        .prefer_pure_change(true)
        .build()
    );

    return txBuilder;
  };

  const getUtxos = async () => {
    try {
      const utxosRaw = await injectedWallet.getUtxos();
      return utxosRaw.map((utxo) => TransactionUnspentOutput.from_bytes(Buffer.from(utxo, 'hex')));
    } catch (error) {
      console.log('Error on getUtxos: ', error);
      throw error;
    }
  };

  const getTxUnspentOutputs = async () => {
    const txOutputs = TransactionUnspentOutputs.new();
    const utxos = await getUtxos();
    for (const utxo of utxos) {
      txOutputs.add(utxo);
    }
    return txOutputs;
  };

  const transferTokens = async (walletName, transferWalletAddress, assetPolicyIdHex, assetNameHex, assetQuantity) => {
    try {
      await connectWallet(walletName);
      const txBuilder = await initTransactionBuilder();
      const changeAddress = await getChangeAddress();
      const shelleyOutputAddress = Address.from_bech32(transferWalletAddress);
      const shelleyChangeAddress = Address.from_bech32(changeAddress);

      let txOutputBuilder = TransactionOutputBuilder.new();
      txOutputBuilder = txOutputBuilder.with_address(shelleyOutputAddress);
      txOutputBuilder = txOutputBuilder.next();

      const multiAsset = MultiAsset.new();
      const assets = Assets.new();
      assets.insert(
        AssetName.new(Buffer.from(assetNameHex, 'hex')), // Asset Name
        BigNum.from_str(assetQuantity) // How much to send
      );
      multiAsset.insert(
        ScriptHash.from_bytes(Buffer.from(assetPolicyIdHex, 'hex')), // PolicyID
        assets
      );

      txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(
        multiAsset,
        BigNum.from_str(protocolParams.coinsPerUtxoWord)
      );
      const txOutput = txOutputBuilder.build();

      txBuilder.add_output(txOutput);

      // Find the available UTXOs in the wallet and
      // us them as Inputs
      const txUnspentOutputs = await getTxUnspentOutputs();
      txBuilder.add_inputs_from(txUnspentOutputs, 3);

      // calculate the min fee required and send any change to an address
      txBuilder.add_change_if_needed(shelleyChangeAddress);

      // once the transaction is ready, we build it to get the tx body without witnesses
      const txBody = txBuilder.build();

      // Tx witness
      const transactionWitnessSet = TransactionWitnessSet.new();

      const tx = Transaction.new(txBody, TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()));

      let txVkeyWitnesses = await injectedWallet.signTx(Buffer.from(tx.to_bytes(), 'utf8').toString('hex'), true);
      txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, 'hex'));

      transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

      const signedTx = Transaction.new(tx.body(), transactionWitnessSet);

      const submittedTxHash = await injectedWallet.submitTx(Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex'));

      return submittedTxHash;
    } catch (error) {
      console.log('Error on transferToken: ', error);
      throw error;
    }
  };

  return {
    connectWallet,
    getChangeAddress,
    getTokensAndBalance,
    supportedWallets,
    transferTokens,
    detectCardanoInjectableWallets,
    getBalanceByPolicyScriptId,
    getUsedAddresses,
  };
};

export default useInjectableWalletHook;
