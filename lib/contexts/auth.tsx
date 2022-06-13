import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorageAuth } from "../hooks/useLocalStorageAuth";
import getSigner from "../getSigner";

export const AuthContext = createContext({
  code: null,
  disconnect: () => {},
});

export const AuthProvider = ({ children }) => {
  const [code, setCode] = useLocalStorageAuth("authCode");
  const router = useRouter();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.code) {
      router.replace(window.location.pathname, undefined, { shallow: true });
      setCode(params.code);
    }
  }, []);

  // Sanity check: if the code cannot be used to recover signer, we log out!
  useEffect(() => {
    if (code) {
      if (!getSigner(code)) {
        setCode(undefined);
      }
    }
  }, [code]);

  return (
    <AuthContext.Provider
      value={{
        code,
        disconnect: () => {
          setCode(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
