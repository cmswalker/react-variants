import React from 'react';
import ReactDom from 'react-dom';

import { IWithVariantProps } from '../src/types';
import { WithVariants, WithRenderProps } from '../src';

import { ExampleComponent, MyStatefulComponent } from './exampleComponents';
import ExampleComponent1 from './variants/1';
import ExampleComponent2 from './variants/2';

// @ts-ignore
ExampleComponent.variants = {
  1: ExampleComponent1,
  2: ExampleComponent2
}

// @ts-ignore
const ExampleComponentWithVariants: React.ComponentType<any> = WithVariants(ExampleComponent);
const MyStatefulComponentWithRenderProps: React.ComponentType<any> = WithRenderProps(MyStatefulComponent);

class App extends React.Component<any, any> {
  render() {
    return <div>
        <ExampleComponentWithVariants variant={0} />
        <ExampleComponentWithVariants variant={1} />
        <ExampleComponentWithVariants variant={2} />
        <ExampleComponentWithVariants variant={3} render={({ displayName, variant }: { displayName: string, variant: number }) => {
            return <div style={{backgroundColor: 'pink'}}>DisplayName: {displayName} Variant: {variant}</div>;
        }} />

        <MyStatefulComponentWithRenderProps variant={0} />
        <MyStatefulComponentWithRenderProps variant={1} render={({ state, props }: { state: any, props: any }) => {
          const { variant, displayName } = props;
          return <div style={{ backgroundColor: 'chartreuse' }}>This is a complete override of the default variant's render function Today's Date is: {state.date} Variant: {variant}</div>
        }}/>
      </div>;
  }
}

ReactDom.render(<App/>, document.getElementById('root'));
