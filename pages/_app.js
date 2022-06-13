import React from "react";
import "../styles/globals.css";
import AuthProvider from '../lib/contexts/auth'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
