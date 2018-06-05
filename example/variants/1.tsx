import React from 'react';
import ReactDom from 'react-dom';

import { IVariantProps } from '../../src/types';
import Shared from '../Shared';

const style = {
  backgroundColor: 'turquoise'
};

class UserProfile1 extends React.Component<IVariantProps> {
  render() {
    const { displayName, variant } = this.props;
    const templateProps = { style, displayName, variant };
    // @ts-ignore
    return <Shared {...templateProps} />
  }
}

export default UserProfile1;