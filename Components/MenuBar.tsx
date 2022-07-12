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
    <header className="bg-gray-100 p-2 rounded-lg text-sm flex justify-between items-center">
      <div className="flex flex-wrap">
        <div className="font-semibold mr-2">Wallet connected</div>
        <div>
          {shortenAddress(signer)}{" "}
          <a onClick={disconnect} href="#">
            &times;
          </a>
        </div>
      </div>
      <div className="font-semibold whitespace-nowrap">{extraLink}</div>
    </header>
  ) : (
    <></>
  );
};

export default MenuBar;
