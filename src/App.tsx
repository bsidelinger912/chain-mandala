import React from 'react';
import styled from 'styled-components';

import './App.css';
import { pageWidth, textColor } from './cssConstants';

import Mandala from './Mandala';
import Palette from './Palette';
import PreviousNFTs from './PreviousNFTs.tsx';

const Wrapper = styled.div`
  width: 100%;
  color: ${textColor};
`;

const Page = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto;
`;

const App: React.FC = () => {
  const [accounts, setAccounts] = React.useState<any[]>();

  const [birthDate, setBirthDate] = React.useState(24);

  const connectWallet = async (): Promise<void> => {
    const updatedAccounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setAccounts(updatedAccounts);
  };

  return (
    <Wrapper>
      <Page>
        <header className="App-header">
          <h1 className="App-header-title">On-chain NFT</h1>
          <div className="App-header-right">
            {accounts ? <span>you connected</span> : <button type="button" className="button" onClick={connectWallet}>Connect wallet</button>}
          </div>
        </header>
        <div className="App-main">
          <div><Mandala birthDate={birthDate} account={accounts?.[0]} /></div>

          <div className="App-main-right">
            <form>
              <label htmlFor="birthday">
                What day of the month were you born?
                <select
                  name="birthday"
                  id="birthday"
                  onChange={(e) => {
                    const stringValue = e.target.value;
                    const numberValue = parseInt(stringValue, 10);
                    setBirthDate(numberValue);
                  }}
                >
                  {Array.from(Array(31).keys()).map((key) => <option key={key + 1} value={key + 1}>{key + 1}</option>)}
                </select>
              </label>
            </form>
            <span>Your colors:</span>
            <Palette birthDate={birthDate} />
          </div>
        </div>
        <PreviousNFTs />
      </Page>
    </Wrapper>
  );
};

export default App;
