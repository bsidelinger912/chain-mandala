import { NFTMetaData } from '../../../types';

export interface FormValues {
  maxGas: string;
  metaData: NFTMetaData;
  errors?: {
    maxGas?: string;
    global?: string;
  },
}
