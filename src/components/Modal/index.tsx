/**
 * @class Modal
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import MuiModal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { pageWidth } from '../../cssConstants';

export interface Props {
  open: boolean;
  onClose: () => void;
}

const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 90vh;
  width: ${pageWidth};
  margin:  5vh auto 0;
  background-color: #282c34;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  outline: none;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Modal: React.FC<Props> = ({ open, onClose, children }) => (
  <MuiModal open={open} onClose={onClose} onBackdropClick={onClose}>
    <ContentWrapper>
      <CloseButtonWrapper>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      {children}
    </ContentWrapper>
  </MuiModal>
);

export default Modal;
