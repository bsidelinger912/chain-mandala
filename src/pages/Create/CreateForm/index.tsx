/**
 * @class CreateForm
 * @description
 */

import React from 'react';

export interface Props {
  imageUri?: string;
}

const CreateForm: React.FC<Props> = ({ imageUri }) => {
  console.log(imageUri);
  return (
    <div>CreateForm</div>
  );
};

export default CreateForm;
