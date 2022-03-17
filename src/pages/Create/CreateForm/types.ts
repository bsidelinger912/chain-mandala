import { NFTMetaData } from '../../../types';

export interface FormValues {
  metaData: NFTMetaData;
  errors?: {
    maxGas?: string;
    global?: string;
  },
}
