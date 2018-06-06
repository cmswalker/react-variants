# react-vary :cat: :smile_cat: :kissing_cat: :heart_eyes_cat: :joy_cat:

## Statically and Dynamically declare variants for AB testing react components

## 2 method API

### WithVariants()

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

        {/* It also supports render props for dynamic tests */}
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
 * @param {Number} props.variant - The assigned variant number
 * @param {Object} props.variants - Reference to all known variants
 * @param {Boolean} props.isDefault - True if the variant is variant 0
 * @param {Boolean} props.isRenderProp - True if the variant is a render prop
 * @param {Boolean} props.isStaticVariant - True if the variant is a static variant
 * @param {Number} props.staticVariantCount - Total Count of all running static variants
 */
```

### WithRenderProps()

This method also returns an HOC wrapper but is for scenarios where you'd like the default component to call it's render() function, but all other variants are components with render props that will override the default render() call. Useful for when you want to keep component state in the default variant while only changing the render abilities of your variants.

```js
import { WithRenderProps } from 'react-vary';

class MyStatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }

    this.interval = this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer() {
    // update state.date every second and re-render
    return setInterval(() => {
      this.setState({
        date: new Date();
      });
    }, 1000);
  }

  render() {
    const { date } = this.state;
    return <div>Original Render Date: {date}</div>
  }
}

const MyStatefulComponentWithRenderProps = WithRenderProps(MyStatefulComponent);

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Variant 0 is our default Component defined above */}
        <MyStatefulComponentWithRenderProps variant={0} />

        {/*
          Here we get all the state updates but with a custom render override.
          All without touching our original component!
        */}
        <MyStatefulComponentWithRenderProps
          variant={1}
          render={({ props, state }) => <div>Date Override: {state.date}</div>}
        />
      </div>
    );
  }
}
```

By passing a component to `WithRenderProps` you get an HOC wrapper back that passes data about your variants via props while automatically invoking state changes as if it were the default component. Each variant receives the following props.

```js
/**
 * @param {...Object} state - Current state that will change based on the behaviour of the default variant
 * @param {...Object} props - The original user-defined Props will be passed through
 * @param {Number} props.variant - The assigned variant number
 * @param {Number} props.renderVariantCount - Total Count of all running render variants
 * @param {Boolean} props.isDefault - True if the variant is variant 0
 * @param {Boolean} props.isRenderProp - True if the variant is a render prop
 */
```

More [Examples](https://github.com/cmswalker/react-vary/tree/master/example)
