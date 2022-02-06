/**
 * @class Preview
 * @description
 */

import React from 'react';

export interface Props {
  imageUri?: string;
}

const Preview: React.FC<Props> = ({ imageUri }) => {
  console.log(imageUri);

  return (
    <div>Preview</div>
  );
};

export default Preview;
