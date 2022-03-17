/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js';
import { TransactionConfig } from '../../../types';

import { web3 } from '../../../web3';

export async function getMaxPriorityFee(): Promise<string | undefined> {
  const maxPriorityFee = await web3.eth.getMaxPriorityFeePerGas();
  return new BigNumber(maxPriorityFee).times(2).integerValue().toString();
}

export async function getGas(tx: TransactionConfig): Promise<string> {
  const gas = await web3.eth.estimateGas(tx);
  return new BigNumber(gas).times(1.2).integerValue().toString();
}
