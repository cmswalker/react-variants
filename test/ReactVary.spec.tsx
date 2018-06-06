import React from 'react';
import renderer from 'react-test-renderer';

import { WithVariants, WithRenderProps } from '../src';
import { ExampleComponent, MyStatefulComponent } from '../example/exampleComponents';
import ExampleComponent1 from '../example/variants/1';
import ExampleComponent2 from '../example/variants/2';

ExampleComponent.variants = {
  1: ExampleComponent1,
  2: ExampleComponent2
}
const ExampleComponentWithVariants : React.ComponentType<any> = WithVariants(ExampleComponent);
const MyStatefulComponentWithRenderProps : React.ComponentType <any> = WithRenderProps(MyStatefulComponent);

const getTime = () => new Date().getSeconds();

beforeAll(() => {
  const constantDate = new Date('2017-06-13T04:41:20');

  // @ts-ignore
  Date = class extends Date {
    // @ts-ignore
    constructor() {
      return constantDate
    }
  }
});

afterAll(() => {

})

test('WithVariants', () => {
  const time = getTime();
  const component = renderer.create(
    <div>
      <ExampleComponentWithVariants variant={0} time={time} />
      <ExampleComponentWithVariants variant={1} time={time} />
      <ExampleComponentWithVariants variant={2} time={time} />
      <ExampleComponentWithVariants variant={3} time={time}
        render={({ time, displayName, variant, staticVariantCount, isDefault, isRenderProp, isStaticVariant, totalRenderCount }) => {
          expect(time).toBe(20);
          expect(displayName).toBe('ExampleComponentAsRenderProp');
          expect(variant).toBe(3);
          expect(staticVariantCount).toBe(3);
          expect(isDefault).toBe(false);
          expect(isRenderProp).toBe(true);
          expect(isStaticVariant).toBe(false);
          return <div></div>;
      }} />
    </div>
  );

  const tree = component.toJSON();
  expect(ExampleComponent.variants[0]).toEqual(expect.any(Function));
  expect(ExampleComponent.variants[1]).toEqual(expect.any(Function));
  expect(ExampleComponent.variants[2]).toEqual(expect.any(Function));
  expect(tree).toMatchSnapshot();
});

test('WithRenderProps', () => {
  const component = renderer.create(
    <div>
      <MyStatefulComponentWithRenderProps variant={0} />
      <MyStatefulComponentWithRenderProps variant={1} render={({props, state}) => {
        // Preserve original comp state
        expect(state.date).toBe('5/2 4:20');
        expect(props.variant).toBe(1);
        expect(props.renderVariantCount).toBe(2);
        expect(props.isDefault).toBe(false);
        expect(props.renderVariantCount).toBe(2);
        expect(props.isRenderProp).toBe(true);
        return <div></div>;
      }}/>
    </div>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});