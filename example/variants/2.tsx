import React from 'react';
import ReactDom from 'react-dom';

import { ExampleComponentProps } from '../exampleTypes';

const style = {
  backgroundColor: 'cornsilk'
};

const ExampleComponent2: React.SFC<ExampleComponentProps> = ({ displayName, variant }) => {
  return <div style={style}>DisplayName: {displayName} Variant: {variant}</div>
};

export default ExampleComponent2;