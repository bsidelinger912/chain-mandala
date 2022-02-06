import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthProvider from './auth/AuthProvider';
import ChainDataProvider from './chainData/Provider';
import { pageWidth, textColor } from './cssConstants';
import Header from './Header';

import Home from './pages/Home';
import Create from './pages/Create';

const Wrapper = styled.div`
  width: 100%;
  color: ${textColor};
`;

const Page = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto;
`;

const App: React.FC = () => (
  <AuthProvider>
    <ChainDataProvider>
      <Wrapper>
        <Page>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Page>
      </Wrapper>
    </ChainDataProvider>
  </AuthProvider>
);

export default App;
