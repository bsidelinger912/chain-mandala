/**
 * @class MintNFT
 * @description
 */

import React, { useEffect, useState } from 'react';
import { NFTMetaData, WindowWithWeb3 } from '../../types';
import { createMetaData } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const contract = require('../../OnChainNFT.json');

const web3 = (window as unknown as WindowWithWeb3).AlchemyWeb3.createAlchemyWeb3(process.env.API_URL as string);
const contractAddress = '0x8272a54660b9ffb18d93e591d2d88c4e7ef27cd5';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

export interface Props {
  imageUri?: string;
  account?: string;
  birthDate: number;
}

const MintNFT: React.FC<Props> = ({ imageUri, birthDate, account }) => {
  const [estimatedGas, setEstimatedGas] = useState<number>();
  const [transactionHash, setTransactionHash] = useState<string>();

  const getEncodedMetaData = (): string | undefined => {
    if (!imageUri) return;

    const metaData: NFTMetaData = {
      image: imageUri,
      attributes: [
        {
          trait_type: 'Birthdate',
          value: birthDate.toString(),
        },
      ],
    };

    return createMetaData(metaData);
  };

  const estimateGas = async (): Promise<void> => {
    const encodedMetaData = getEncodedMetaData();

    const tx = {
      from: account,
      to: contractAddress,
      gas: '800000000',
      data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
    };

    const gasEstimate = await web3.eth.estimateGas(tx);
    setEstimatedGas(gasEstimate);
  };

  const mint = async (): Promise<void> => {
    if (!imageUri) return;

    const encodedMetaData = getEncodedMetaData();

    const tx = {
      from: account,
      to: contractAddress,
      gas: '800000000',
      data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
    };

    const txHash = await (window as any).ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });

    setTransactionHash(txHash);
    console.log('***** Success, hash is: ', txHash);
  };

  useEffect(() => {
    if (account && imageUri) {
      setEstimatedGas(undefined);
      estimateGas();
      setTransactionHash(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUri, account]);

  let text = '';
  if (transactionHash) {
    text = `Success: Transaction Hash: ${transactionHash}`;
  } else if (estimatedGas) {
    text = `Estimated gas: ${estimatedGas}`;
  } else if (imageUri && account) {
    text = 'Estimating...';
  }

  return (
    <div className="MintNFT">
      <form onSubmit={mint}>
        {text ? <div className="MintNFT_formRow">{text}</div> : null}
        <button type="submit" disabled={!imageUri || !account || !estimatedGas || !!transactionHash}>Mint NFT</button>
      </form>
    </div>
  );
};

export default MintNFT;
