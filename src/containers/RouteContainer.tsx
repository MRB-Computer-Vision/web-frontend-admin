import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuthContext } from '../contexts/Auth';

interface Props {
  isProtected?: boolean;
  path?: string;
  exact?: boolean;
  component?: any;
}

const RouteContainer: React.FC<Props> = ({ isProtected, ...others }: Props) => {
  const { isAuthenticated, isAuthenticating } = useAuthContext();
  if (isAuthenticating) {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    );
  }
  console.log(`route: ${isProtected},${isAuthenticated}`);
  if (isProtected && !isAuthenticated) {
    return <Redirect to="/signin" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...others} />;
};

export default RouteContainer;
