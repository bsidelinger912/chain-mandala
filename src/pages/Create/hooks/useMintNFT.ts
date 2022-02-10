import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransactionReceipt } from 'web3-core';

import { useAuth } from '../../../auth/AuthProvider';
import { NFTMetaData } from '../../../types';
import { createMetaData } from '../../../util';
import { contractAddress, nftContract, web3 } from '../../../web3';
import imageUri from '../atoms/imageUri';
import shapes, { emptyShapes, Shapes } from '../atoms/shapes';

export type MintStatus = 'idle' | 'loading' | 'confirming' | 'success' | 'error';

export interface UseMintNFT {
  gasEstimate: {
    loading: boolean;
    estimate?: number;
  },
  minting: {
    status: MintStatus;
    error?: string;
    transactionHash?: string;
  },
  mint: (maxGas: string) => Promise<void>;
  clearMintState: () => void;
}

const getEncodedMetaData = (image: string, currentShapes: Shapes): string | undefined => {
  const colors = new Set<string>();
  currentShapes.lines.forEach((line) => colors.add(line.color));
  currentShapes.curves.forEach((curve) => colors.add(curve.color));
  currentShapes.perpendiculars.forEach((perp) => colors.add(perp.color));

  const metaData: NFTMetaData = {
    image,
    attributes: Array.from(colors).map((color, index) => ({
      trait_type: `Color #${index + 1}`,
      value: color,
    })),
  };

  return createMetaData(metaData);
};

export default function useMintNFT(): UseMintNFT {
  const [imageUriState, setImageUriState] = useRecoilState(imageUri);
  const [shapesState, setShapesState] = useRecoilState(shapes);

  const [estimateLoading, setEstimateLoading] = useState(false);
  const [estimate, setEstimate] = useState<number>();

  const [mintStatus, setMintStatus] = useState<MintStatus>('idle');
  const [mintError, setMintError] = useState<string>();
  const [transactionHash, setTransactionHash] = useState<string>();

  const { account } = useAuth();

  const clearMintState = (): void => {
    setMintStatus('idle');
    setMintError(undefined);
    setTransactionHash(undefined);
  };

  const estimateGas = useCallback(async (): Promise<void> => {
    if (!imageUriState && !account) return;

    setEstimateLoading(true);

    try {
      const encodedMetaData = getEncodedMetaData(imageUriState as string, shapesState);

      const tx = {
        from: account as string,
        to: contractAddress,
        data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
      };

      const gasEstimate = await web3.eth.estimateGas(tx);

      setEstimate(gasEstimate);
    } catch (e) {
      console.error('error minting NFT:', e);
    } finally {
      setEstimateLoading(false);
    }
  }, [account, imageUriState, shapesState]);

  const mint = async (maxGas: string): Promise<void> => {
    if (!imageUriState) {
      setMintError('Image not ready for minting');
      return;
    }

    setMintStatus('loading');
    setMintError(undefined);

    try {
      const encodedMetaData = getEncodedMetaData(imageUriState as string, shapesState);

      const tx = {
        from: account as string,
        to: contractAddress,
        gas: maxGas,
        data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
      };

      web3.eth.sendTransaction(tx)
        .on('transactionHash', (hash) => {
          setTransactionHash(hash);
          setMintStatus('confirming');
        })
        .on('receipt', (receipt: TransactionReceipt) => {
          if (receipt.status) {
            setMintStatus('success');
            setImageUriState(undefined);
            setShapesState(emptyShapes);
          } else {
            setMintError('Error minting token');
            setMintStatus('error');
          }
        })
        .on('error', (err) => {
          setMintError(err.message);
          setMintStatus('error');
        }); // If a out of gas error, the second parameter is the receipt.
    } catch (err: any) {
      setMintError(err.message);
      setMintStatus('error');
    }
  };

  useEffect(() => {
    if (imageUriState) {
      estimateGas();
      setMintError(undefined);
    }
  }, [estimateGas, imageUriState]);

  return {
    gasEstimate: {
      loading: estimateLoading,
      estimate,
    },
    minting: {
      status: mintStatus,
      error: mintError,
      transactionHash,
    },
    mint,
    clearMintState,
  };
}
