import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { useAuth } from '../../../auth/AuthProvider';
import approveCoin from '../atoms/approveCoin';
import { contractAddress, tokenContract, web3 } from '../../../web3';
import { getMaxPriorityFee } from './util';

export type ApproveStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseApproveCoin {
  approving: {
    status: ApproveStatus;
    error?: string;
  },
  approve: () => Promise<void>;
}

export default function useApproveCoin(): UseApproveCoin {
  const [approving, setApproving] = useRecoilState(approveCoin);

  const { account } = useAuth();

  const approve = useCallback(async (): Promise<void> => {
    try {
      setApproving({ status: 'loading' });
      const maxPriorityFee = await getMaxPriorityFee();
      await tokenContract.methods.approve(contractAddress, '1000000000000000000').send({ from: account, maxPriorityFeePerGas: maxPriorityFee });
      setApproving({ status: 'success' });
    } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setApproving({ status: 'error', error: e.message });
    }
  }, [account, setApproving]);

  return {
    approving,
    approve,
  };
}
