/**
 * @class CreateForm
 * @description
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import useGenerateSVG from '../hooks/useGenerateSVG';
import useMintNFT from '../hooks/useMintNFT';
import birthDate from '../atoms/birthDate';
import BirthDate from './BirthDate';
import GenerateButton from './GenerateButton';
import MintingFields from './MintingFields';
import Transaction, { Props as TransactionProps } from './Transaction';
import { ButtonWrapper, Heading } from './components';
import { useAuth } from '../../../auth/AuthProvider';
import { tokenContract } from '../../../web3';
import config from '../../../config';

export interface Props {
  svgRef: React.MutableRefObject<SVGSVGElement | undefined>;
}

const LoadingWithText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  >p {
    min-width: 30%;
  }
`;

const CreateForm: React.FC<Props> = ({ svgRef }) => {
  const [birthDateState] = useRecoilState(birthDate);
  const [tokenBalance, setTokenBalance] = useState<number>();

  const { account, connect, chainId } = useAuth();
  const chainError = !(chainId && config.chainIDs.find((ch) => ch === chainId));

  const checkTokenBalance = useCallback(async () => {
    const balance = await tokenContract.methods.balanceOf(account).call();
    setTokenBalance(balance / 10 ** 18);
  }, [account]);

  useEffect(() => {
    if (account && typeof tokenBalance === 'undefined') {
      checkTokenBalance();
    }
  }, [account, checkTokenBalance, tokenBalance]);

  const {
    minting, mint, clearMintState,
  } = useMintNFT();

  const { generate, generating } = useGenerateSVG(birthDateState as number, svgRef);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    mint();
  }, [mint]);

  if (minting.transactionHash) {
    return <Transaction minting={minting as TransactionProps['minting']} clearMintState={clearMintState} />;
  }

  if (!account) {
    return (
      <>
        <Heading variant="h4">First, connect your Polygon Wallet</Heading>
        <p>
          Make sure your wallet has the Polygon Network selected!
        </p>
        <ButtonWrapper>
          <Button onClick={connect} size="large" variant="contained">
            Connect
          </Button>
        </ButtonWrapper>
      </>
    );
  }

  if (chainError) {
    return (
      <>
        <Heading variant="h4">You must connect to the Polygon network</Heading>
        <p>
          Open your connected wallet and switch to Polygon
        </p>
      </>
    );
  }

  if (typeof tokenBalance === 'undefined') {
    return (
      <LoadingWithText>
        <Typography>Checking MDC balance</Typography>
        <CircularProgress />
      </LoadingWithText>
    );
  }

  if (tokenBalance < 1) {
    return (
      <div>
        <Heading variant="h4">You need MDLA tokens to mint a Mandala!</Heading>
        If you found out about this dApp from a friend, ask them how to get some MDLA.  If you just happened across it,
        come back in the future and we may sell MDLA tokens so you can mint yourself a Mandala.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading variant="h4">Mint your NFT</Heading>
      <BirthDate />
      <GenerateButton generate={generate} generating={generating} />
      <MintingFields minting={minting} />
    </form>
  );
};

export default CreateForm;
