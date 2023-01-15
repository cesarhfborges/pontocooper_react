import React, {createContext} from 'react';

const AuthContext = createContext<boolean>(true);
export const AuthProvider: React.FC<any> = (props: any) => (
  <AuthContext.Provider value={false}>{props.children}</AuthContext.Provider>
);
export default AuthContext;
