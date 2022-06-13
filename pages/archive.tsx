import React, { useContext, useEffect, useState } from "react";
import Template from "../Components/Template";
import AlphaTwtInList from "../Components/AlphaTwtInList";
import { AuthContext } from "../lib/contexts/auth";
import ConnectWallet from "../Components/ConnectWallet";
import useAlphaTwt from "../lib/hooks/useAlphaTwt";
import Link from "next/link";

const Archive = () => {
  const [archive, setArchive] = useState([]);
  const { list } = useAlphaTwt();
  const { code } = useContext(AuthContext);

  useEffect(() => {
    const getArchive = async () => {
      const alphatweets = await list();
      setArchive(alphatweets);
    };
    if (code) {
      getArchive();
    }
  }, [list, code]);

  return (
    <Template
      title="Archive"
      showLeft={true}
      extraLink={<Link href={"/"}>Post new Tweet</Link>}
    >
      {!code && <ConnectWallet />}
      {code && (
        <section>
          {archive.map((alphaTwt, key) => (
            <AlphaTwtInList key={key} alphaTwt={alphaTwt} />
          ))}
        </section>
      )}
    </Template>
  );
};

export default Archive;
