import React, { createContext, useState, useEffect, useContext } from 'react';

import jsonWebTokenService from 'jsonwebtoken';

import * as auth from '../services/auth';

import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(params: any): Promise<any>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // carregando dados locais
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // recuperando osd dados do storage
      const storagedUser = localStorage.getItem('@mrb:user');
      const storagedToken = localStorage.getItem('@mrb:token');
      console.log('useEffect: ', storagedUser);
      // se existir os dados sao setados no estado
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
      setLoading(false);
    }
    // chama a funcao assincrona
    loadStorageData();
  });

  async function signIn(params: any): Promise<any> {
    const response = await auth.signIn(params);
    // recuperando dados da resposta
    const { Authorization } = response.data;
    const decodedJwt = jsonWebTokenService.decode(Authorization);
    const userAuth = { id: decodedJwt?.sub, name: 'Sam' };
    setUser(userAuth);
    api.defaults.headers.Authorization = `Baerer ${Authorization}`;
    localStorage.setItem('@mrb:user', JSON.stringify(userAuth));
    localStorage.setItem('@mrb:token', Authorization);
    return response;
  }

  async function signOut(): Promise<void> {
    await localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): any {
  // context tem todos os atributos de AuthContextData, e
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export { AuthProvider, useAuth };
