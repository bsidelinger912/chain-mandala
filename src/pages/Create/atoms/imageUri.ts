import { atom } from 'recoil';

const imageUri = atom<string | undefined>({
  key: 'mandala-nft-imageUri',
  default: undefined,
});

export default imageUri;
