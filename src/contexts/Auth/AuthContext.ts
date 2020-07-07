import { createContext } from 'react';

import { AuthContextData } from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
