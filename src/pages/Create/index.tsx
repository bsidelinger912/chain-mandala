/**
 * @class Create
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';

import CreateForm from './CreateForm';
import Preview from './Preview';

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  > div {
    width: 50%;
  }

  > div:last-child {
    margin-left: 20px;
  }
`;

const FormCard = styled(Card)`
  padding: 20px;
`;

const Create: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>();

  return (
    <Wrapper>
      <div>
        <FormCard variant="outlined">
          <CreateForm svgRef={svgRef} />
        </FormCard>
      </div>
      <div>
        <Preview ref={svgRef as React.Ref<SVGSVGElement>} />
      </div>
    </Wrapper>
  );
};

export default Create;
