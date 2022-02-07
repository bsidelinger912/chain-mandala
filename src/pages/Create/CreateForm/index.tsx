/**
 * @class CreateForm
 * @description
 */

import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import SvgIcon from '@mui/material/SvgIcon';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from 'styled-components';

import { NFTMetaData } from '../../../types';
import useGenerateSVG from '../hooks/useGenerateSVG';
import imageUri from '../atoms/imageUri';
import { useAuth } from '../../../auth/AuthProvider';
import useMintNFT from '../hooks/useMintNFT';

export interface Props {
  svgRef: React.MutableRefObject<SVGSVGElement | undefined>;
}

interface FormValues {
  birthDate: string;
  maxGas: string;
  metaData: NFTMetaData;
  errors?: {
    maxGas?: string;
    global?: string;
  },
}

const Heading = styled(Typography)`
  margin-bottom: 30px;
`;

const FullWidthControl = styled(FormControl)`
  width: 100%;
`;

const InlineControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  >label {
    font-size: 1.1rem;
    min-width: 30%;
  }

  >div {
    flex: 1;
    margin-left: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
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

const TransactionText = styled.div`
  display: flex;
  align-items: center;
`;

const CreateForm: React.FC<Props> = ({ svgRef }) => {
  const [imageUriState] = useRecoilState(imageUri);
  const { account, connect } = useAuth();

  const [formValues, setFormValues] = useState<Partial<FormValues>>({
    birthDate: '0',
    maxGas: '',
  });

  const { gasEstimate, minting, mint } = useMintNFT();
  const { generate } = useGenerateSVG(parseInt(formValues.birthDate as string, 10), svgRef);

  useEffect(() => {
    if (gasEstimate.estimate) {
      const rounded = Math.ceil(gasEstimate.estimate / 1000) * 1000;

      setFormValues((currentFormValues) => ({
        ...currentFormValues,
        maxGas: rounded.toString(),
      }));
    }
  }, [gasEstimate.estimate]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((currentFormValues) => ({
      ...formValues,
      [name]: value,
      errors: {
        ...(currentFormValues.errors || {}),
        [name]: undefined,
      },
    }));
  }, [formValues]);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    if (!formValues.maxGas) {
      setFormValues((currentFormValues) => ({
        ...currentFormValues,
        errors: {
          maxGas: 'You must enter Max Gas',
        },
      }));
      return;
    }

    mint(formValues.maxGas);
  }, [formValues, mint]);

  if (minting.transactionHash) {
    return (
      <div>
        <Heading variant="h4">Success</Heading>

        <TransactionText>
          <Typography>
            Transaction hash: &nbsp;
            <a href={`https://mumbai.polygonscan.com/tx/${minting.transactionHash}`} target="_blank" rel="noreferrer">
              {`${minting.transactionHash.substr(0, 20)}...`}
              <OpenInNewIcon />
            </a>
          </Typography>
        </TransactionText>
      </div>
    );
  }

  let generateButton: React.ReactNode = null;
  let birthdayLabel = 'To get started, enter the day of the month you were born';

  if (formValues.birthDate !== '0') {
    birthdayLabel = 'You can change this number to get different color palettes';
    const buttonText = imageUriState ? 'Re-Generate Mandala' : 'Generate a Mandala';

    generateButton = (
      <Button onClick={generate} size="large" variant="contained">
        {buttonText}
      </Button>
    );
  }

  let bottomContent: React.ReactNode = null;
  if (imageUriState) {
    if (!account) {
      bottomContent = (
        <ButtonWrapper>
          <Button onClick={connect} size="large" variant="contained">
            Connect Wallet
          </Button>
        </ButtonWrapper>
      );
    } else if (gasEstimate.loading) {
      bottomContent = (
        <LoadingWithText>
          <Typography>Estimating gas</Typography>
          <CircularProgress />
        </LoadingWithText>
      );
    } else {
      bottomContent = (
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
                value={gasEstimate.estimate}
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
              {minting.loading && <SubmitLoader size={20} />}
            </Button>
          </SubmitButtonWrapper>
        </>
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading variant="h4">Mint your NFT</Heading>
      <FormControl>
        <InlineControl>
          <FormLabel htmlFor="birthDate">{birthdayLabel}</FormLabel>
          <Select
            name="birthDate"
            id="birthDate"
            value={formValues.birthDate}
            onChange={handleChange as any}
            MenuProps={{
              onClose: () => {
                (document.activeElement as HTMLElement).blur();
              },
            }}
            autoFocus
          >
            <MenuItem value="0" disabled>select</MenuItem>
            {Array.from(Array(31).keys()).map((key) => <MenuItem key={key + 1} value={key + 1}>{key + 1}</MenuItem>)}
          </Select>
        </InlineControl>
        <FormHelperText>This will create a color palette based on your numerology</FormHelperText>
      </FormControl>
      <ButtonWrapper>{generateButton}</ButtonWrapper>
      {bottomContent}
    </form>
  );
};

export default CreateForm;
