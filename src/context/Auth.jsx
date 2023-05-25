import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [Auth, setAuth] = useState();
  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
