import { useContext } from 'react';

import Context from './AuthContext';
import { AuthContextData } from './types';

const useAuthContext = (): AuthContextData => useContext(Context);

export default useAuthContext;
