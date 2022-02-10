/**
 * @class Transaction
 * @description
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

import { Heading } from '../components';
import { UseMintNFT } from '../../hooks/useMintNFT';

export interface Props {
  minting: UseMintNFT['minting'] & {
    transactionHash: string;
  };
  clearMintState: () => void;
}

const TransactionText = styled.div`
  display: flex;
  align-items: center;
`;

const AlertWrapper = styled.div`
  border: 1px solid white;
  border-radius: 5px;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;
`;

const RetryButton = styled(Button)`
  margin: 20px 0 0;
`;

const Transaction: React.FC<Props> = ({ minting, clearMintState }) => {
  const scanLink = (
    <a href={`https://mumbai.polygonscan.com/tx/${minting.transactionHash}`} target="_blank" rel="noreferrer">
      {`${minting.transactionHash.substr(0, 20)}...`}
      <OpenInNewIcon />
    </a>
  );

  if (minting.status === 'error') {
    return (
      <>
        <AlertWrapper>
          <Alert severity="error">
            Error minting token
            <br />
            Details:
            {' '}
            {scanLink}
          </Alert>
        </AlertWrapper>
        <RetryButton onClick={clearMintState}>Retry</RetryButton>
      </>
    );
  }

  if (minting.status === 'success') {
    return (
      <AlertWrapper>
        <Alert severity="success">
          Your Mandala was successfully minted!
          <br />
          Details:
          {' '}
          {scanLink}
        </Alert>
      </AlertWrapper>
    );
  }

  return (
    <div>
      <Heading variant="h4">Transaction processing</Heading>

      <LoaderWrapper><CircularProgress /></LoaderWrapper>

      <TransactionText>
        <Typography>
          Transaction hash: &nbsp;
          {scanLink}
        </Typography>
      </TransactionText>
    </div>
  );
};

export default Transaction;
