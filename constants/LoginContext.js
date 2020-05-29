import { createContext } from 'react';

const LoginContext = createContext({
  isLogin: false,
  doLogin: () => {},
});

export default LoginContext;
