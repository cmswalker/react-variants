import React from 'react';
import ReactDom from 'react-dom';

import UserProfileWithVariants from './UserProfile';

class App extends React.Component {
  render() {
    return <div>
      <UserProfileWithVariants variant={0}/>
      <UserProfileWithVariants variant={1}/>
      <UserProfileWithVariants variant={2}/>
      <UserProfileWithVariants variant={3}/>
      <UserProfileWithVariants
        variant={0}
        render={({props, state} : {
        props: any,
        state: any
      }) => {
        const { displayName, time } = state;
        return <div>RENDER PROP: DisplayName: {displayName} Time: {time}</div>;
      }}/>
      <UserProfileWithVariants
        render={({props, state} : {
        props: any,
        state: any
      }) => {
        const {renderCount} = props;
        const { displayName} = state;
        return <div>RENDER PROP: DisplayName: {displayName} RenderCount: {renderCount}</div>;
      }}/>
    </div>;
  }
}

ReactDom.render(
  <App/>, document.getElementById('root'));
