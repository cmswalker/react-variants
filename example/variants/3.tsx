import React from 'react';
import ReactDom from 'react-dom';

import { IVariantProps } from '../../src/types';
import { UserProfile } from '../UserProfile';
import Shared from '../Shared';

const style = {
  backgroundColor: 'coral'
};

const UserProfile3: React.SFC<IVariantProps> = ({ displayName, variant, isDefault}) => {
  // @ts-ignore
  return <UserProfile render={({ state }: {
    state: any
  }) => {
    const { time } = state;
    const templateProps = { style, displayName, variant, isDefault, time };
    // @ts-ignore
    return <Shared {...templateProps} />
  }} />
};

export default UserProfile3;