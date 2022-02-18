/**
 * @class MintingFields
 * @description
 */

import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

import { InlineControl, SubmitLoader } from '../components';
import imageUri from '../../atoms/imageUri';
import { useAuth } from '../../../../auth/AuthProvider';
import { UseMintNFT } from '../../hooks/useMintNFT';
import { FormValues } from '../types';
import birthDate from '../../atoms/birthDate';
import { tokenContract } from '../../../../web3';

export interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  minting?: UseMintNFT['minting'];
  formValues: Partial<FormValues>;
}

const FullWidthControl = styled(FormControl)`
  width: 100%;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MintingFields: React.FC<Props> = ({
  handleChange, minting, formValues,
}) => {
  const [imageUriState] = useRecoilState(imageUri);
  const [birthDateState] = useRecoilState(birthDate);

  const [tokenBalance, setTokenBalance] = useState<number>();

  const { account } = useAuth();

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
      <FullWidthControl>
        <InlineControl>
          <FormLabel htmlFor="maxGas">Max Gas</FormLabel>
          <TextField onChange={handleChange} id="maxGas" name="maxGas" variant="outlined" value={formValues.maxGas} />
        </InlineControl>
      </FullWidthControl>
      {minting?.error && <Alert severity="error">{minting.error}</Alert>}
      <SubmitButtonWrapper>
        <Button disabled={minting?.status === 'loading'} type="submit" variant="contained" size="large">
          Mint NFT
          {minting?.status === 'loading' && <SubmitLoader size={20} />}
        </Button>
      </SubmitButtonWrapper>
    </>
  );
};

export default MintingFields;
