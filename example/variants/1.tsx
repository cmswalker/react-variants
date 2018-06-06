import React from 'react';
import ReactDom from 'react-dom';

import { ExampleComponentProps } from '../exampleTypes';

const style = {
  backgroundColor: 'turquoise'
};

class ExampleComponent1 extends React.Component<ExampleComponentProps> {
  render() {
    const { displayName, variant } = this.props;
    return <div style={style}>DisplayName: {displayName} Variant: {variant}</div>
  }
}

export default ExampleComponent1;