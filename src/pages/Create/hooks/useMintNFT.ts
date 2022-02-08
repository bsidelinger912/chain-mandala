import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuth } from '../../../auth/AuthProvider';
import { NFTMetaData } from '../../../types';
import { createMetaData } from '../../../util';
import { contractAddress, nftContract, web3 } from '../../../web3';
import imageUri from '../atoms/imageUri';
import shapes, { emptyShapes } from '../atoms/shapes';

export interface UseMintNFT {
  gasEstimate: {
    loading: boolean;
    estimate?: number;
  },
  minting: {
    loading: boolean;
    error?: string;
    transactionHash?: string;
  },
  mint: (maxGas: string) => Promise<void>;
}

const getEncodedMetaData = (image: string): string | undefined => {
  const metaData: NFTMetaData = {
    image,
    attributes: [], // TODO: better attributes
  };

  return createMetaData(metaData);
};

export default function useMintNFT(): UseMintNFT {
  const [imageUriState, setImageUriState] = useRecoilState(imageUri);
  const setShapesState = useSetRecoilState(shapes);

  const [estimateLoading, setEstimateLoading] = useState(false);
  const [estimate, setEstimate] = useState<number>();

  const [mintLoading, setMintLoading] = useState(false);
  const [mintError, setMintError] = useState<string>();
  const [transactionHash, setTransactionHash] = useState<string>();

  const { account } = useAuth();

  const estimateGas = useCallback(async (): Promise<void> => {
    if (!imageUriState && !account) return;

    setEstimateLoading(true);

    try {
      const encodedMetaData = getEncodedMetaData(imageUriState as string);

      const tx = {
        from: account as string,
        to: contractAddress,
        data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
      };

      const gasEstimate = await web3.eth.estimateGas(tx);
      const divided = Math.round(gasEstimate / 10);

      setEstimate(divided);
    } catch (e) {
      console.error('error minting NFT:', e);
    } finally {
      setEstimateLoading(false);
    }
  }, [account, imageUriState]);

  const mint = async (maxGas: string): Promise<void> => {
    if (!imageUriState) {
      setMintError('Image not ready for minting');
      return;
    }

    setMintLoading(true);
    setMintError(undefined);

    try {
      const encodedMetaData = getEncodedMetaData(imageUriState as string);

      const tx = {
        from: account,
        to: contractAddress,
        gas: maxGas,
        data: nftContract.methods.mintNFT(account, encodedMetaData).encodeABI(),
      };

      // TODO: use web3??
      const txHash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      setTransactionHash(txHash);
      setImageUriState(undefined);
      setShapesState(emptyShapes);
    } catch (err: any) {
      setMintError(err.message);
    } finally {
      setMintLoading(false);
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
      loading: mintLoading,
      error: mintError,
      transactionHash,
    },
    mint,
  };
}
