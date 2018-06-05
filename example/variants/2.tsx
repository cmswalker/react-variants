import React from 'react';
import ReactDom from 'react-dom';

import { IVariantProps } from '../../src/types';
import Shared from '../Shared';

const style = {
  backgroundColor: 'cornsilk'
};

const UserProfile2: React.SFC<IVariantProps> = ({ displayName, variant }) => {
  const templateProps = { style, displayName, variant };

  // @ts-ignore
  return <Shared {...templateProps}/>
};

export default UserProfile2;