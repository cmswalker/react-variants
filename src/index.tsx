import React from 'react';

import { InternalState, IVariantProps, IVariantState, DefaultVariantComponent } from './types';

const isNull = (val: any): boolean => val === null;
const isUndefined = (val: any): boolean => val === undefined;
const isFunc = (val: any): boolean => typeof val === 'function';
const isObjectLiteral = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]';
const isEmpty = (val: object): boolean => !Object.keys(val).length;
const getDisplayName = (comp : Function): string => comp.name || comp.constructor.name;
const generateRenderName = (name : string, displayName: string) : string => name || `${displayName}AsRenderProp`;
const withRenderError = (displayName: string, msg: string): Error => new Error(`Error in WithRenderProps(${displayName}): ${msg}`);
const withVariantsError = (displayName : string, msg: string) : Error => new Error(`Error in WithVariants(${displayName}): ${msg}`);

export function WithRenderProps(DefaultVariant: React.ComponentType): React.ComponentClass<any> {
  const displayName = getDisplayName(DefaultVariant);

  return class RenderWrapper extends React.Component<any, any> {
    render() {
      const topProps = this.props;
      const { render: topRender, variant = 0} = topProps;
      const isRenderProp = isFunc(topRender);
      const isDefault = !variant;
      const newProps = { ...topProps, variant, isDefault, isRenderProp, displayName };

      if (isDefault) {
        return <DefaultVariant {...newProps}  />
      }

      if (isRenderProp) {
        // @ts-ignore
        class RenderProp extends DefaultVariant<any, any> {
          render() {
            // @ts-ignore
            this.props = newProps;
            return topRender(this);
          }
        }

        // @ts-ignore
        return <RenderProp/>
      }

      throw withRenderError(displayName, 'Could not find render definition or variant');
    }
  }
}

export function WithVariants(defaultVariant: DefaultVariantComponent): React.ComponentClass<IVariantProps> {
  if (!isFunc(defaultVariant)) {
    throw new Error('Must provide initial variant as first argument');
  }

  const { variants = {}} = defaultVariant;
  variants[0] = defaultVariant;

  const displayName = getDisplayName(defaultVariant);

  if (!isObjectLiteral(variants) || isEmpty(variants)) {
    throw withVariantsError(displayName, 'Must provide variant configuration with at least one variant');
  }

  let renderVariantCount = 0;
  const staticVariantCount = Object.keys(variants).length;
  let totalVariantCount = staticVariantCount;

  return class VariantWrapper extends React.Component<IVariantProps, IVariantState> {
    constructor(props: IVariantProps) {
      super(props);

      const { variant } = props;

      if (isNull(variant) || isUndefined(variant) || isNaN(variant)) {
        throw withVariantsError(displayName, `Must provide variant prop to ${displayName}`);
      }

      const isRenderProp = isFunc(props.render);

      if (isRenderProp) {
        renderVariantCount++;
        totalVariantCount++;
      }

      const isStaticVariant = !!variants[variant];
      const initialState = {
        ...props,
        isRenderProp,
        isStaticVariant,
        displayName,
        variants: { ...variants },
        isDefault: variant === 0,
        staticVariantCount
      };

      this.state = initialState;
    }

    render() {
      const { state, props } = this;
      const { variant, variants, isRenderProp } = state;

      const VariantComponent : React.ComponentType<any> = variants[variant];
      let name: string|undefined = VariantComponent && getDisplayName(VariantComponent);

      if (isRenderProp) {
        name = generateRenderName(name, displayName);
      }

      const combinedProps = { ...state, ...props, displayName: name, renderVariantCount, totalVariantCount };

      if (isRenderProp) {
        const Rendered = WithRenderProps(defaultVariant);
        return <Rendered {...combinedProps} />;
      }

      if (!isFunc(VariantComponent)) {
        throw withVariantsError(displayName, `No variant # ${variant} exists for ${name}, check your config`);
      }

      return <VariantComponent {...combinedProps} />;
    }
  };
}
