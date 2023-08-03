import { createContext, useState } from "react";

export const AuthStatus = createContext(false);

export function AuthProvider({ children }) {
  let isToken = localStorage.getItem("accessToken") != null ? true : false;
  let localUsername =
    localStorage.getItem("username") != null
      ? localStorage.getItem("username")
      : "";

  const [authStatus, setAuthStatus] = useState(isToken);
  const [userName, setUserName] = useState(localUsername);

  return (
    <AuthStatus.Provider
      value={{ authStatus, setAuthStatus, userName, setUserName }}
    >
      {children}
    </AuthStatus.Provider>
  );
}
