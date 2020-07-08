/* eslint-disable react/prop-types */
import React from 'react';
import jsonWebTokenService from 'jsonwebtoken';
import Context from './AuthContext';
import { User, AuthContextData, SignInProps } from './types';
import useFetchApi from '../../hooks/useFetchApi';

const getUserFromStorage = (): User => {
  let user: User = {};
  try {
    user = JSON.parse(window.localStorage.getItem('@irb:user') || '{}');
  } catch (err) {
    console.log(err);
  }
  return user;
};

const setUserToStorage = (user: User): void => {
  window.localStorage.setItem('@irb:user', JSON.stringify(user));
};

const getTokenFromStorage = (): string => {
  let token = '';
  try {
    token = window.localStorage.getItem('@irb:token') || '';
  } catch (err) {
    console.log(err);
  }
  return token;
};

const setTokenToStorage = (token: string): void => {
  window.localStorage.setItem('@irb:token', token);
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(getUserFromStorage());
  const [token, setToken] = React.useState<string>(getTokenFromStorage());
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(true);

  const { startFetch, data, isFetching } = useFetchApi('/auth/login', 'POST');

  const signIn = async (params: SignInProps): Promise<void> => {
    startFetch(JSON.stringify(params));
  };

  const signOut = async (): Promise<void> => {
    setUserToStorage({});
    setTokenToStorage('');
    setUser({});
    setToken('');
  };

  React.useEffect(() => {
    setIsAuthenticating(isFetching);
  }, [isFetching, setIsAuthenticating]);

  React.useEffect(() => {
    if (data.Authorization) {
      const { Authorization } = data;
      const decodedJwt = jsonWebTokenService.decode(Authorization);
      const userAuth = { id: decodedJwt?.sub, name: 'Dr. Profile' };
      setUser(userAuth);
      setToken(Authorization);
      setUserToStorage(userAuth);
      setTokenToStorage(Authorization);
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
    token,
    user,
    isAuthenticated,
    isAuthenticating,
    signIn,
    signOut,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AuthProvider;
