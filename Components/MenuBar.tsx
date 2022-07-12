import React, { useContext, useMemo } from "react";
import { AuthContext } from "../lib/contexts/auth";
import getSigner from "../lib/getSigner";
import { shortenAddress } from "../lib/utils";

const MenuBar = ({ extraLink }) => {
  const { code, disconnect } = useContext(AuthContext);

  const signer = useMemo(() => {
    if (code) {
      return getSigner(code);
    }
  }, [code]);

  return code ? (
    <header className="bg-gray-100 p-2 rounded-lg text-sm flex justify-between">
      <div className="flex">
        <div className="font-semibold">Wallet connected</div>
        <div className="ml-2">
          {shortenAddress(signer)}{" "}
          <a onClick={disconnect} href="#">
            &times;
          </a>
        </div>
      </div>
      <div className="font-semibold">{extraLink}</div>
    </header>
  ) : (
    <></>
  );
};

export default MenuBar;
