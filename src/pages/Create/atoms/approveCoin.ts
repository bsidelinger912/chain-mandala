import { atom } from 'recoil';

export type ApproveStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Approving {
  status: ApproveStatus;
  error?: string;
}

const approveCoin = atom<Approving>({
  key: 'mandala-nft-approving',
  default: { status: 'idle' },
});

export default approveCoin;
