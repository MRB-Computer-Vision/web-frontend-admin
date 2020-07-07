/* eslint-disable react/prop-types */
import React from 'react';
import jsonWebTokenService from 'jsonwebtoken';
import Context from './AuthContext';
import { User, AuthContextData, SignInProps } from './types';
import useFetchApi from '../../hooks/useFetchApi';

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>({});
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(true);

  const { startFetch, data, isFetching } = useFetchApi('/auth/login', 'POST');

  const signIn = async (params: SignInProps): Promise<void> => {
    startFetch(JSON.stringify(params));
  };

  const signOut = async (): Promise<void> => {
    await localStorage.clear();
    setUser({});
  };

  const loadStorage = async (): Promise<void> => {
    console.log('stored1');
    const storagedUser = localStorage.getItem('@irb:user');
    console.log('stored2', storagedUser);
    if (storagedUser) {
      console.log('stored3', JSON.parse(storagedUser));
      setUser(JSON.parse(storagedUser));
    }
  };

  React.useEffect(() => {
    loadStorage();
  }, []);

  React.useEffect(() => {
    setIsAuthenticating(isFetching);
  }, [isFetching, setIsAuthenticating]);

  React.useEffect(() => {
    if (data.Authorization) {
      const { Authorization } = data;
      const decodedJwt = jsonWebTokenService.decode(Authorization);
      const userAuth = { id: decodedJwt?.sub, name: 'Sam' };
      localStorage.setItem('@irb:user', JSON.stringify(userAuth));
      localStorage.setItem('@irb:token', Authorization);
      setUser(userAuth);
    }
  }, [data]);

  React.useEffect(() => {
    if (user.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.id, setIsAuthenticated]);

  const value: AuthContextData = {
    user,
    isAuthenticated,
    isAuthenticating,
    signIn,
    signOut,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AuthProvider;
