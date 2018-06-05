import React from 'react';

import { IVariants, IVariantProps, IWithVariantProps } from '../src/types';
import { WithVariants } from '../src';
import UserProfile1 from './variants/1';
import UserProfile2 from './variants/2';
import UserProfile3 from './variants/3';
import Shared from './Shared';

const getSeconds = () => new Date().getSeconds();

export class UserProfile extends React.Component<IVariantProps, any> {
  constructor(props: any) {
    super(props);
    this.state = { time: getSeconds() }
    this.startTimer();
  }

  static variants: IVariants = {
    1: UserProfile1,
    2: UserProfile2,
    3: UserProfile3
  };

  private startTimer(): void {
    setInterval(() => {
      this.setState({
        time: getSeconds()
      });
    }, 1000);
  }

  public render() {
    if (this.props.render) {
      return this.props.render(this);
    }

    const { displayName, isDefault, variant } = this.props;
    const { time } = this.state;
    const templateProps = { displayName, isDefault, variant, time };

    // @ts-ignore
    return <Shared {...templateProps} />;
  }
}

const UserProfileWithVariants: React.ComponentType<IWithVariantProps> = WithVariants(UserProfile);

export default UserProfileWithVariants;