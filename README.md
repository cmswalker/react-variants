# react-vary :cat: :smile_cat: :kissing_cat: :heart_eyes_cat: :joy_cat:

Statically and Dynamically declare variants for AB testing react components

Similar to the Top-level API of prop-types. Good for scenarios where you'd like to duplicate component logic to avoid pushing variant logic into the component.

```js
import { WithVariants } from 'react-vary';
import MyComp1 from './variants/1';
import MyComp2 from './variants/2';

// The Component that receives the variants will be considered default (variant 0)
class MyComp extends React.Component {
  render() {
    const { props } = this;
    return <div>Variant: {this.props.variant}</div>
  }
}
MyComp.variants = {
  1: MyComp1,
  2: MyComp2
}

const MyCompWithVariants = WithVariants(MyComp);

// However you determine variants is up to you
// Just pass the known variant number down through the parent HOC to render the variant Child
class App extends React.Component {
  render() {
    return (
      <div>
        {/* Variant 0 is our default Component defined above */}
        <MyCompWithVariants variant={0} />
        <MyCompWithVariants variant={1} />
        <MyCompWithVariants variant={2} />

        {/*
          It also supports render props for dynamic tests
          Here we get all the state updates of variant 0 but with a custom render override.
          All without touching our original component!
        */}
        <MyCompWithVariants variant={3} render={({ displayName, variant }) => {
            return <div>DisplayName: {displayName} Variant: {variant}</div>;
        }} />
      </div>
    );
  }
}
```

By passing a component to `WithVariants` you get an HOC wrapper back that passes data about your variants via props. Each variant receives the following props.

```js
/**
 * @param {...Object} props - The original user-defined Props will be passed through
 * @param {...Object} state - Available for render-prop variants only, state updates from default variant
 * @param {Number} props.variant - The assigned variant number
 * @param {Object} props.variants - Reference to all known variants
 * @param {Boolean} props.isDefault - True if the variant is variant 0
 * @param {Boolean} props.isRenderProp - True if the variant is a render prop
 * @param {Boolean} props.isStaticVariant - True if the variant is a static variant
 * @param {Number} props.staticVariantCount - Total Count of all running static variants
 * @param {Number} props.renderVariantCount - Total Count of all running render prop variants
 * @param {Number} props.totalVariantCount - Total Count of all running variants
 */
```

More [Examples](https://github.com/cmswalker/react-vary/tree/master/example)
