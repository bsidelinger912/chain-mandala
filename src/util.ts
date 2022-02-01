/* eslint-disable import/prefer-default-export */
import { NFTMetaData } from './types';

export function createMetaData(data: NFTMetaData): string {
  return `data:application/json;base64,${btoa(JSON.stringify(data))}`;
}
