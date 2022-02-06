/* eslint-disable import/prefer-default-export */
export const CHAIN_IDS = process.env.CHAIN_IDS?.split(',').map((stringId) => parseInt(stringId, 10)) || [];
