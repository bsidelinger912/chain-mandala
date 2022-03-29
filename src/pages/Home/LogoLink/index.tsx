/**
 * @class LogoLink
 * @description
 */

import React from 'react';
import Tooltip from 'react-tooltip-lite';
import styled from 'styled-components';
import { useTheme } from '@mui/material';

export interface Props {
  image: string;
  tooltipText: string;
  href: string;
}

interface ImageProps {
  linkColor: string;
}

const Image = styled.img<ImageProps>`
  border: 2px solid transparent;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    border-color: ${(props: ImageProps) => props.linkColor};
    background-color: ${(props: ImageProps) => props.linkColor};
  }
`;

const LogoLink: React.FC<Props> = ({ image, tooltipText, href }) => {
  const theme = useTheme();
  return (
    <Tooltip content={tooltipText}>
      <a href={href} target="_blank" rel="noreferrer">
        <Image width="50" height="50" src={image} alt={tooltipText} linkColor={theme.palette.primary.main} />
      </a>
    </Tooltip>
  );
};

export default LogoLink;
