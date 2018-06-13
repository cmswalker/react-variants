import React from 'react';
import ReactDom from 'react-dom';

import { WithVariants } from '../src';
import { ExampleComponent, MyStatefulComponent } from './exampleComponents';
import ExampleComponent1 from './variants/1';
import ExampleComponent2 from './variants/2';

// @ts-ignore
MyStatefulComponent.variants = {
  1: ExampleComponent1,
  2: ExampleComponent2
}

// @ts-ignore
const MyStatefulComponentWithVariants: React.ComponentType<any> = WithVariants(MyStatefulComponent);

class App extends React.Component<any, any> {
  render() {
    return <div>
        <MyStatefulComponentWithVariants variant={0} />
        <MyStatefulComponentWithVariants variant={1} />
        <MyStatefulComponentWithVariants variant={2} />
        <MyStatefulComponentWithVariants variant={3} render={({ state, props }: { state: any, props: any }) => {
            return <div style={{backgroundColor: 'pink'}}>render prop</div>;
        }} />
      </div>;
  }
}

ReactDom.render(<App/>, document.getElementById('root'));
