/**
 * @class AuthProvider
 * @description
 */

import React, {
  createContext, useCallback, useContext, useEffect, useMemo,
} from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import Web3 from 'web3';

import { injected } from './connectors';
import { web3 } from '../web3';

function getLibrary(provider: any): Web3 {
  return new Web3(provider);
}

export interface AuthContext {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  active: boolean;
  account?: string | null;
  chainId?: number;
}

const ctx = createContext<AuthContext>({} as AuthContext);

export const useAuth = (): AuthContext => useContext(ctx);

const AuthProvider: React.FC = ({ children }) => {
  const {
    active, account, activate, deactivate, chainId,
  } = useWeb3React();

  const connect = useCallback(async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (ex) {
      console.error('TODO: error handling');
      console.error(ex);
    }
  }, [activate]);

  const disconnect = useCallback(async (): Promise<void> => {
    deactivate();
  }, [deactivate]);

  useEffect(() => {
    web3.eth.getAccounts()
      .then((addr: string[]) => {
        if (addr.length > 0) {
          connect();
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: AuthContext = useMemo(() => ({
    connect,
    disconnect,
    active,
    account,
    chainId,
  }), [account, active, connect, disconnect, chainId]);

  return (
    <ctx.Provider value={contextValue}>{children}</ctx.Provider>
  );
};

const Wrapper: React.FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}><AuthProvider>{children}</AuthProvider></Web3ReactProvider>
);

export default Wrapper;
