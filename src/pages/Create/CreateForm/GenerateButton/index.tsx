/**
 * @class GenerateButton
 * @description
 */

import React from 'react';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';

import birthDate from '../../atoms/birthDate';
import imageUri from '../../atoms/imageUri';
import { ButtonWrapper } from '../components';

export interface Props {
  generate: () => void;
}

const GenerateButton: React.FC<Props> = ({ generate }) => {
  const [birthDateState] = useRecoilState(birthDate);
  const [imageUriState] = useRecoilState(imageUri);

  if (!birthDateState) {
    return null;
  }

  return (
    <ButtonWrapper>
      <Button variant="contained" size="large" onClick={generate}>
        {imageUriState ? 'Regenerate Mandala' : 'Generate Your Mandala'}
      </Button>
    </ButtonWrapper>

  );
};

export default GenerateButton;
