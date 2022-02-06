import React from 'react';
import styled from 'styled-components';

import './App.css';
import AuthProvider, { useAuth } from './auth/AuthProvider';
import { pageWidth, textColor } from './cssConstants';
import Header from './Header';

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
  const [birthDate, setBirthDate] = React.useState(24);

  return (
    <AuthProvider>
      <Wrapper>
        <Page>
          <Header />
          <div className="App-main">
            <div><Mandala birthDate={birthDate} /></div>

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
    </AuthProvider>
  );
};

export default App;
