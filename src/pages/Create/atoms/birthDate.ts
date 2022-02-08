import { atom } from 'recoil';

const birthDate = atom<number | undefined>({
  key: 'mandala-nft-birthDate',
  default: undefined,
});

export default birthDate;
