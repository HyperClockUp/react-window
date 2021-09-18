import React from 'react';

const RemoteComponent = <T,>(component: string) => {
  const NativeComponent: (props: T) => React.ReactElement<T> = eval(`0,${component}`);
  return NativeComponent;
};

export default RemoteComponent;
