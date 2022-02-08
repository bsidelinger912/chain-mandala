/**
 * @class MintingFields
 * @description
 */

import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

import { ButtonWrapper, InlineControl } from '../components';
import imageUri from '../../atoms/imageUri';
import { useAuth } from '../../../../auth/AuthProvider';
import { UseMintNFT } from '../../hooks/useMintNFT';
import { FormValues } from '../types';
import birthDate from '../../atoms/birthDate';

export interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gasEstimate?: UseMintNFT['gasEstimate'];
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

const LoadingWithText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  >p {
    min-width: 30%;
  }
`;

const SubmitLoader = styled(CircularProgress)`
  margin-left: 20px;
  color: black;
`;

const MintingFields: React.FC<Props> = ({
  handleChange, gasEstimate, minting, formValues,
}) => {
  const [imageUriState] = useRecoilState(imageUri);
  const [birthDateState] = useRecoilState(birthDate);

  const { account, connect } = useAuth();

  if (!imageUriState || !birthDateState) {
    return null;
  }

  if (!account) {
    return (
      <ButtonWrapper>
        <Button onClick={connect} size="large" variant="contained">
          Connect Wallet
        </Button>
      </ButtonWrapper>
    );
  } if (gasEstimate?.loading) {
    return (
      <LoadingWithText>
        <Typography>Estimating gas</Typography>
        <CircularProgress />
      </LoadingWithText>
    );
  }
  return (
    <>
      <FullWidthControl>
        <InlineControl>
          <FormLabel>Gas Estimate</FormLabel>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="gasEstimate"
            variant="outlined"
            value={gasEstimate?.estimate}
          />
        </InlineControl>
      </FullWidthControl>
      <FullWidthControl>
        <InlineControl>
          <FormLabel htmlFor="maxGas">Max Gas</FormLabel>
          <TextField onChange={handleChange} id="maxGas" name="maxGas" variant="outlined" value={formValues.maxGas} />
        </InlineControl>
      </FullWidthControl>
      <SubmitButtonWrapper>
        <Button type="submit" variant="contained" size="large">
          Mint NFT
          {minting?.loading && <SubmitLoader size={20} />}
        </Button>
      </SubmitButtonWrapper>
    </>
  );
};

export default MintingFields;
