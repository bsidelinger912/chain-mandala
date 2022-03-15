/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js';

import { web3 } from '../../../web3';

export async function getMaxPriorityFee(): Promise<string | undefined> {
  // if (process.env.CHAIN_ENV === 'development') {
  //   return undefined;
  // }
  const maxPriorityFee = await web3.eth.getMaxPriorityFeePerGas();

  const feeNumber = new BigNumber(maxPriorityFee);

  console.log(feeNumber.toString());

  return feeNumber.times(2).toString();
}
