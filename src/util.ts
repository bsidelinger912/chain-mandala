/* eslint-disable import/prefer-default-export */
import { NFTMetaData } from './types';

export function createMetaData(data: NFTMetaData): string {
  return `data:application/json;base64,${btoa(JSON.stringify(data))}`;
}

export function extractMetaData(tokenURI: string): NFTMetaData {
  const encoded = tokenURI.split(';base64,')[1];

  try {
    const json = atob(encoded);
    return JSON.parse(json) as NFTMetaData;
  } catch (e) {
    throw new Error('Failed to parse metadata');
  }
}
