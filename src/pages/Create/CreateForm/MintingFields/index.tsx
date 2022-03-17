/**
 * @class MintingFields
 * @description
 */

import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

import { SubmitLoader } from '../components';
import imageUri from '../../atoms/imageUri';
import { useAuth } from '../../../../auth/AuthProvider';
import { UseMintNFT } from '../../hooks/useMintNFT';
import birthDate from '../../atoms/birthDate';
import { tokenContract } from '../../../../web3';
import ApproveButton from './ApproveButton';
import useApproveCoin from '../../hooks/useApproveCoin';

export interface Props {
  minting?: UseMintNFT['minting'];
}

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 30px;
  }
`;

const MintingFields: React.FC<Props> = ({ minting }) => {
  const [imageUriState] = useRecoilState(imageUri);
  const [birthDateState] = useRecoilState(birthDate);

  const [tokenBalance, setTokenBalance] = useState<number>();

  const { account } = useAuth();
  const { approving } = useApproveCoin();

  const checkTokenBalance = useCallback(async () => {
    const balance = await tokenContract.methods.balanceOf(account).call();
    setTokenBalance(balance / 10 ** 18);
  }, [account]);

  useEffect(() => {
    if (account && typeof tokenBalance === 'undefined') {
      checkTokenBalance();
    }
  }, [account, checkTokenBalance, tokenBalance]);

  if (!imageUriState || !birthDateState) {
    return null;
  }

  return (
    <>
      {minting?.error && <Alert severity="error">{minting.error}</Alert>}
      <SubmitButtonWrapper>
        <ApproveButton />
        <Button disabled={minting?.status === 'loading' || approving.status !== 'success'} type="submit" variant="contained" size="large">
          Mint NFT
          {minting?.status === 'loading' && <SubmitLoader size={20} />}
        </Button>
      </SubmitButtonWrapper>
    </>
  );
};

export default MintingFields;
