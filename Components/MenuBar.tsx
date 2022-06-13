import React, { useContext, useMemo } from "react";
import { AuthContext } from "../lib/contexts/auth";
import getSigner from "../lib/getSigner";

const MenuBar = ({ extraLink }) => {
  const { code, disconnect } = useContext(AuthContext);

  const signer = useMemo(() => {
    if (code) {
      return getSigner(code);
    }
  }, [code]);

  return (
    <footer>
      {code && (
        <>
          Connected as {signer} <button onClick={disconnect}>x</button> &nbsp;
          {extraLink}
        </>
      )}
    </footer>
  );
};

export default MenuBar;
