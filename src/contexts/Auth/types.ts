export interface User {
  id?: string;
  name?: string;
}

export interface SignInProps {
  email?: string;
  password?: string;
}

export interface AuthContextData {
  token?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User;
  signIn: (params: SignInProps) => Promise<any>;
  signOut: () => void;
}
