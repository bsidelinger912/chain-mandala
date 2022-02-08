/**
 * @class GenerateButton
 * @description
 */

import React from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';

import birthDate from '../../atoms/birthDate';
import imageUri from '../../atoms/imageUri';
import { ButtonWrapper, SubmitLoader } from '../components';

export interface Props {
  generate: () => void;
  generating: boolean;
}

const GenerateButton: React.FC<Props> = ({ generate, generating }) => {
  const [birthDateState] = useRecoilState(birthDate);
  const [imageUriState] = useRecoilState(imageUri);

  if (!birthDateState) {
    return null;
  }

  const buttonText = (() => {
    if (generating) {
      return 'Generating';
    } if (imageUriState) {
      return 'Regenerate Mandala';
    }
    return 'Generate Your Mandala';
  })();

  return (
    <ButtonWrapper>
      <Button variant="contained" size="large" onClick={generate} disabled={generating}>
        {buttonText}
        {generating && <SubmitLoader size={20} />}
      </Button>
    </ButtonWrapper>

  );
};

export default GenerateButton;
