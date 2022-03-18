/**
 * @class ApproveButton
 * @description
 */

import React from 'react';
import Button from '@mui/material/Button';
import useApproveCoin from '../../hooks/useApproveCoin';
import { SubmitLoader } from '../components';

const ApproveButton: React.FC = () => {
  const { approve, approving } = useApproveCoin();

  return (
    <Button variant="contained" size="large" disabled={approving.status === 'success'} onClick={approve}>
      {approving.status === 'success' ? 'Approved' : 'Approve 1 MDLA'}
      {approving.status === 'loading' && <SubmitLoader size={20} />}
    </Button>
  );
};

export default ApproveButton;
