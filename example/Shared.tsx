import React from 'react';

// @ts-ignore
const Shared = ({ style = {}, displayName, variant, time, isDefault }) => {
return (
  <div style={style}>DisplayName: {displayName} Variant: {variant} Time: {time}</div>
  );
}

export default Shared;