/* eslint-disable import/prefer-default-export */
import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAIN_IDS } from '../constants';

export const injected = new InjectedConnector({
  supportedChainIds: CHAIN_IDS,
});
