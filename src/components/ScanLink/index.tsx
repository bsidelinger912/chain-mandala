/**
 * @class ScanLink
 * @description
 */

import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export interface Props {
  hash: string;
}

const ScanLink: React.FC<Props> = ({ hash }) => (
  <a href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank" rel="noreferrer">
    {`${hash.substr(0, 20)}...`}
    <OpenInNewIcon />
  </a>
);

export default ScanLink;
