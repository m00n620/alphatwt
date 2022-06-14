import React, { useContext, useMemo } from "react";
import { AuthContext } from "../lib/contexts/auth";
import { Grid } from "@mui/material";
import getSigner from "../lib/getSigner";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} lg={10}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <h2>Create your tweet & monetize it right at start.</h2>
              <p>
                AlphaTweet enables you to token-gate your tweets & empower your
                followers to earn rewards.
              </p>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <Image
                    src="/assets/walletLogo.png"
                    alt="alphatwtLogo"
                    width="241"
                    height="138"
                    layout="intrinsic"
                  />
                  <p>Please connect wallet to get started</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
