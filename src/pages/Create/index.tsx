/**
 * @class Create
 * @description
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import CreateForm from './CreateForm';
import Preview from './Preview';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Create: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>();

  return (
    <Wrapper>
      <div>
        <CreateForm />
      </div>
      <div>
        <Preview />
      </div>
    </Wrapper>
  );
};

export default Create;
