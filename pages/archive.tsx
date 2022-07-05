import React, { useContext, useEffect, useState } from "react";
import Template from "../Components/Template";
import AlphaTwtInList from "../Components/AlphaTwtInList";
import { AuthContext } from "../lib/contexts/auth";
import ConnectWallet from "../Components/ConnectWallet";
import MenuBar from "../Components/MenuBar";
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
  }, [code]);

  return (
    <Template extraHead={null} title="Archive">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:max-w-[310px]">
          <h4 className="text-4xl font-bold mb-6">My AlphaTweets</h4>
          <p className="text-lg leading-5">
            AlphaTweet enables you to gate your tweets, monetize & empower your
            followers to earn rewards.
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 w-full">
          {!code ? (
            <ConnectWallet />
          ) : (
            <>
              <MenuBar extraLink={<Link href={"/"}>Create new tweet</Link>} />
              <section>
                {archive.map((alphaTwt, key) => (
                  <AlphaTwtInList key={key} alphaTwt={alphaTwt} />
                ))}
              </section>
            </>
          )}
        </div>
      </div>
    </Template>
  );
};

export default Archive;
