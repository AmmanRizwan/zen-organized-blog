import { createContext } from "react";

export interface ILoginUserData {
  id: string;
  username: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  isAuth: boolean;
  userData: ILoginUserData | null;
  login: (userData: ILoginUserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  userData: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
