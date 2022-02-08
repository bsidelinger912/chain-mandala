/**
 * @class BirthDate
 * @description
 */

import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import birthDate from '../../atoms/birthDate';
import { InlineControl, InlineValue } from '../components';
import Palette from './Palette';

const BirthDate: React.FC = () => {
  const [birthDateState, setBirthDateState] = useRecoilState(birthDate);

  const handleChangeBirthDate = useCallback((e: SelectChangeEvent<number>) => {
    setBirthDateState(e.target.value as number);
  }, [setBirthDateState]);

  let birthdayLabel = 'To get started, enter the day of the month you were born';
  if (typeof birthDateState !== 'undefined') {
    birthdayLabel = 'You can change this number to get different color palettes';
  }

  if (birthDateState) {
    return (
      <InlineValue>
        <Typography>Your colors:</Typography>
        <Palette birthDate={birthDateState} />
        <Button onClick={() => setBirthDateState(undefined)} variant="text">change</Button>
      </InlineValue>
    );
  }

  return (
    <FormControl>
      <InlineControl>
        <FormLabel htmlFor="birthDate">{birthdayLabel}</FormLabel>
        <Select
          name="birthDate"
          id="birthDate"
          value={birthDateState || 0}
          onChange={handleChangeBirthDate}
          MenuProps={{
            onClose: () => {
              (document.activeElement as HTMLElement).blur();
            },
          }}
          autoFocus
          placeholder="Select"
        >
          <MenuItem value={0} disabled>select</MenuItem>
          {Array.from(Array(31).keys()).map((key) => <MenuItem key={key + 1} value={key + 1}>{key + 1}</MenuItem>)}
        </Select>
      </InlineControl>
      <FormHelperText>This will create a color palette based on your numerology</FormHelperText>
    </FormControl>
  );
};

export default BirthDate;
