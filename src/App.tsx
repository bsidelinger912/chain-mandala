import React, { useState } from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import AuthProvider from './auth/AuthProvider';
import ChainDataProvider from './chainData/Provider';
import { pageWidth, textColor } from './cssConstants';
import Header from './Header';

import Home from './pages/Home';
import Create from './pages/Create';
import Modal from './components/Modal';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Wrapper = styled.div`
  width: 100%;
  color: ${textColor};
`;

const Page = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto;
`;

const App: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const onCreateModalClose = (): void => setCreateModalOpen(false);

  return (
    <RecoilRoot>
      <AuthProvider>
        <ChainDataProvider>
          <ThemeProvider theme={theme}>
            <Wrapper>
              <Page>
                <Header />
                <Home onMintButtonClick={() => setCreateModalOpen(true)} />
                <Modal open={createModalOpen} onClose={onCreateModalClose}>
                  <Create />
                </Modal>
              </Page>
            </Wrapper>
          </ThemeProvider>
        </ChainDataProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
