/**
 * @class CreateForm
 * @description
 */

import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';

import useGenerateSVG from '../hooks/useGenerateSVG';
import useMintNFT from '../hooks/useMintNFT';
import birthDate from '../atoms/birthDate';
import BirthDate from './BirthDate';
import GenerateButton from './GenerateButton';
import MintingFields from './MintingFields';
import { FormValues } from './types';
import Transaction from './Transaction';
import { Heading } from './components';

export interface Props {
  svgRef: React.MutableRefObject<SVGSVGElement | undefined>;
}

const CreateForm: React.FC<Props> = ({ svgRef }) => {
  const [birthDateState] = useRecoilState(birthDate);

  const [formValues, setFormValues] = useState<Partial<FormValues>>({
    maxGas: '',
  });

  const {
    gasEstimate, minting, mint, clearMintState,
  } = useMintNFT();
  // TODO: fix this cast
  const { generate, generating } = useGenerateSVG(birthDateState as number, svgRef);

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
    return <Transaction minting={minting as any} clearMintState={clearMintState} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading variant="h4">Mint your NFT</Heading>
      <BirthDate />
      <GenerateButton generate={generate} generating={generating} />
      <MintingFields handleChange={handleChange} formValues={formValues} gasEstimate={gasEstimate} minting={minting} />
    </form>
  );
};

export default CreateForm;
