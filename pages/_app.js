import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

export const AuthContext = React.createContext(null);

function MyApp({ Component, pageProps }) {
  const [code, setCode] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    router.replace(URL, undefined, { shallow: true });
    setCode(params.code);
  }, []);

  return (
    <AuthContext.Provider value={code}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
