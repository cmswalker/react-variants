import React from 'react';

import { IVariants } from '../src/types';
import { ExampleComponentProps } from './exampleTypes';

export class ExampleComponent extends React.Component<ExampleComponentProps, any> {
  constructor(props: any) {
    super(props);
  }

  static variants: IVariants = { };

  public render() {
    const { displayName, variant, staticVariantCount } = this.props;
    return <div style={{ backgroundColor: 'coral' }}>DisplayName: {displayName} Variant: {variant} Static Variant Count: {staticVariantCount}</div>
  }
}

const getSeconds = () => new Date().getSeconds();
const getHours = () => new Date().getHours();
const getDate = () => {
  const d = new Date();
  return `${d.getMonth()}/${d.getDay()} ${getHours()}:${getSeconds()}`;
};

export class MyStatefulComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: getDate()
    }

    // @ts-ignore
    this.interval = this.startTimer();
  }

  componentWillUnmount(): void {
    // @ts-ignore
    clearInterval(this.interval);
  }

  startTimer(): NodeJS.Timer {
    return setInterval(() => {
      this.setState({
        date: getDate()
      });
    }, 1000);
  }

  render() {
    const { date } = this.state;
    return <div style={{ backgroundColor: 'cornflowerblue' }}>Today's Date: {date}</div>;
  }
}