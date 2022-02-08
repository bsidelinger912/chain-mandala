/**
 * @class CreateForm
 * @description
 */

import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from 'styled-components';

import useGenerateSVG from '../hooks/useGenerateSVG';
import useMintNFT from '../hooks/useMintNFT';
import birthDate from '../atoms/birthDate';
import BirthDate from './BirthDate';
import GenerateButton from './GenerateButton';
import MintingFields from './MintingFields';
import { FormValues } from './types';

export interface Props {
  svgRef: React.MutableRefObject<SVGSVGElement | undefined>;
}

const Heading = styled(Typography)`
  margin-bottom: 30px;
`;

const TransactionText = styled.div`
  display: flex;
  align-items: center;
`;

const CreateForm: React.FC<Props> = ({ svgRef }) => {
  const [birthDateState] = useRecoilState(birthDate);

  const [formValues, setFormValues] = useState<Partial<FormValues>>({
    maxGas: '',
  });

  const { gasEstimate, minting, mint } = useMintNFT();
  // TODO: fix this cast
  const { generate } = useGenerateSVG(birthDateState as number, svgRef);

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

  return (
    <form onSubmit={handleSubmit}>
      <Heading variant="h4">Mint your NFT</Heading>
      <BirthDate />
      <GenerateButton generate={generate} />
      <MintingFields handleChange={handleChange} formValues={formValues} />
    </form>
  );
};

export default CreateForm;
