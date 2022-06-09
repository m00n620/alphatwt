import React, { useContext, useEffect, useState } from "react";
import prisma from "../lib/prisma";
import Head from "next/head";
import { ethers } from "ethers";
import { AuthContext } from "./_app";
import styles from "../styles/Home.module.css";

const AlphaList = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      fetch("/api/alphatwt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alphatwt,
          code, //. this identifies the user - returned back from Unlock as auth for user
        }),
      }).then((resp) => {
        // TODO: pull out array of tweets from resp and set to state
        debugger;
        const tweets = [];

        setData(tweets);
      });
    }
  });

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <Head>
        <title>View AlphaTwts</title>
        <meta name="description" content="Generated by AlphaTwt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlphaList;

/**
 * state prop called data
 * useEffect
 *
 * replace list item with the aalphatwt component on [id].tsx
 *
 * new API route similar to [id].tsx - prisma.alphaTwt.findMany
 */