/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const InlineControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  >label {
    font-size: 1.1rem;
    min-width: 30%;
  }

  >div {
    flex: 1;
    margin-left: 20px;
  }
`;

export const InlineValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  >p {
    font-size: 1.1rem;
  }

  >button {
    margin-left: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

export const SubmitLoader = styled(CircularProgress)`
  margin-left: 20px;
  color: black;
`;
