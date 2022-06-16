import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Select from "react-select";
import Link from "next/link";
import Template from "../Components/Template";
import { Grid } from "@mui/material";
import Image from "next/image";

import { AuthContext } from "../lib/contexts/auth";
import ConnectWallet from "../Components/ConnectWallet";
import useAlphaTwt from "../lib/hooks/useAlphaTwt";
import MenuBar from "../Components/MenuBar";

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

const Home = () => {
  const { code } = useContext(AuthContext);
  const { create } = useAlphaTwt();
  const [route, setRoute] = useState();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "Title",
      preview: "This is the preview text",
      content: "This is the content",
      network: networks[0].value,
      lock: "0xAF55e472Dc785f1613a346246E5B271Bf233219E",
    },
  });
  const router = useRouter();

  const onSubmit = async (alphatwt) => {
    const { result, success } = await create(alphatwt);
    if (success && result) {
      router.push(`/p/${result.id}`);
    } else {
      alert("There was an error!");
    }
  };

  return (
    <Template
      showLeft
      extraHead={null}
      extraLink={<Link href={"/archive"}>previous alphatweets</Link>}
    >
      {!code && (
        <Grid
          item
          xs={8}
          justifyContent="center"
          alignItems="center"
          style={{
            height: "528px",
            borderRadius: "8px",
            border: "solid black 1px",
          }}
        >
          <Grid item>
            <Grid
              container
              justifyContent="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Image
                  src="/assets/walletLogo.png"
                  alt="alphatwtLogo"
                  width="241"
                  height="138"
                  layout="intrinsic"
                />
              </Grid>
              <Grid item>
                <p>Please connect wallet to get started</p>
              </Grid>
              <Grid item>
                <ConnectWallet />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {code && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ margin: "2rem" }}
          spacing={3}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <hr />
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={12} md={8}>
                <p>
                  <label>
                    <h4>Title:</h4>
                    <input {...register("title", { required: true })} />
                  </label>
                </p>
              </Grid>
              <Grid item xs={12} md={8}>
                <p>
                  <label>
                    <h4>Content:</h4>
                    <p>
                      This content is what your follower will see after they
                      unlock the tweet.
                    </p>
                    <textarea {...register("content", { required: true })} />
                  </label>
                </p>
              </Grid>
              <hr />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={12} md={8}>
                <h4>Gated Setting:</h4>
                <p>
                  AlphaTweet is powered by Unlock Protocol- you will need to
                  create a lock in order to gate this tweet. Launch Unlock
                  Dashboard.
                </p>
                <p>
                  <label>
                    <p>Network of the Lock:</p>
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
              </Grid>
              <Grid item xs={12} md={8}>
                <p>
                  <label>
                    <h4>Lock address:</h4>
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
              </Grid>
              <hr />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={12} md={8}>
                <p>
                  <label>
                    <h4>Preview Text:</h4>
                    <p>
                      This is the preview text that will appear when your
                      follower reshares your AlphaTweet.
                    </p>
                    <textarea {...register("preview", { required: true })} />
                  </label>
                </p>
              </Grid>
              <Grid item xs={12} md={8}>
                <p>
                  <input type="submit" value="Publish" />
                </p>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
    </Template>
  );
};

export default Home;
