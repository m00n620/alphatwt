import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import atob from "atob";
import styles from "../../styles/Home.module.css";
import { AuthContext } from "../_app";

const networks = [
  {
    value: 100,
    label: "Gnosis Chain",
  },
  {
    value: 137,
    label: "Polygon",
  },
  {
    value: 1,
    label: "Ethereum",
  },
  {
    value: 4,
    label: "Rinkeby",
  },
];

const Create = () => {
  const code = useContext(AuthContext);
  const [route, setRoute] = useState();
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  // useContext;

  // useEffect(() => {
  //   router.push(`/p/:id`);
  // }, [router]);

  const onSubmit = async ({ title, preview, content, lock, network }) => {
    const alphatwt = {
      title,
      preview,
      content,
      lock,
      network,
    };

    const post = await fetch("/api/alphatwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alphatwt,
        code, //. this identifies the user - returned back from Unlock as auth for user
      }),
    });
    console.log("redirect to post page, based on its id", post);
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    window.location.href =
      "https://app.unlock-protocol.com/checkout?client_id=localhost:3000&redirect_uri=http://localhost:3000/p";
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create AlphaTwt</title>
        <meta name="description" content="Generated by AlphaTwt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!code && (
          <p>
            <button onClick={connectWallet}>Connect your wallet!</button>
          </p>
        )}
        {code && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              <label>
                Title:
                <input
                  defaultValue="test"
                  {...register("title", { required: true })}
                />
              </label>
            </p>
            <p>
              <label>
                Preview:
                <textarea {...register("preview", { required: true })} />
              </label>
            </p>
            <p>
              <label>
                Content:
                <textarea {...register("content", { required: true })} />
              </label>
            </p>

            <p>
              <label>
                Network:
                <Controller
                  required
                  control={control}
                  name="network"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputRef={ref}
                      value={networks.find((opt) => opt.value == value)}
                      onChange={(option) => onChange(option.value)}
                      options={networks}
                    />
                  )}
                />
              </label>
            </p>

            <p>
              <label>
                Lock:
                <input
                  placeholder="0x...."
                  {...register("lock", {
                    required: true,
                    validate: (value) => {
                      return !!value.match(/^0x[a-fA-F0-9]{40}$/);
                    },
                  })}
                />
              </label>
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        )}
      </main>
    </div>
  );
};

export default Create;
