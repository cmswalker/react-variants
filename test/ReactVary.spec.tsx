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
const MyStatefulComponentWithRenderProps : React.ComponentType<any> = WithVariants(MyStatefulComponent);

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

});

test('WithVariants', () => {
  const time = getTime();
  const component = renderer.create(
    <div>
      <ExampleComponentWithVariants variant={0} time={time} />
      <ExampleComponentWithVariants variant={1} time={time} />
      <ExampleComponentWithVariants variant={2} time={time} />
      <ExampleComponentWithVariants variant={3} time={time}
        render={({ state, props }) => {
          const { time, displayName, variant, variants, staticVariantCount, isDefault, isRenderProp, isStaticVariant, totalRenderCount, renderVariantCount, totalVariantCount } = props;

          expect(variant).toBe(3);
          expect(variants).toBeInstanceOf(Object);
          expect(state).toBe(null);
          expect(time).toBe(20);
          expect(displayName).toBe('ExampleComponent');
          expect(staticVariantCount).toBe(3);
          expect(renderVariantCount).toBe(1);
          expect(totalVariantCount).toBe(4);
          expect(isDefault).toBe(false);
          expect(isRenderProp).toBe(true);
          expect(isStaticVariant).toBe(false);
          return <div></div>;
      }} />
      <MyStatefulComponentWithRenderProps variant={0} time={time} />
      <MyStatefulComponentWithRenderProps variant={1} time={time}
        render={({ state, props }) => {
          const { time, displayName, variant, variants, staticVariantCount, isDefault, isRenderProp, isStaticVariant, totalRenderCount, renderVariantCount, totalVariantCount } = props;
          const { date } = state;

          expect(date).toBe('5/2 4:20');

          expect(variant).toBe(1);
          expect(variants).toBeInstanceOf(Object);
          expect(time).toBe(20);
          expect(displayName).toBe('MyStatefulComponent');
          expect(staticVariantCount).toBe(1);
          expect(renderVariantCount).toBe(1);
          expect(totalVariantCount).toBe(2);
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