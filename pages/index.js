import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Select from "react-select";
import Link from "next/link";
import Template from "../Components/Template";

import ConnectWallet from "../Components/ConnectWallet";
import MenuBar from "../Components/MenuBar";
import networks from "../config/networks";
import { AuthContext } from "../lib/contexts/auth";
import useAlphaTwt from "../lib/hooks/useAlphaTwt";

const Home = () => {
  const { code } = useContext(AuthContext);
  const { create } = useAlphaTwt();
  const [route, setRoute] = useState();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      preview: "",
      content: "",
      network: null,
      lock: null,
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
    <Template extraHead={null}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:max-w-[310px]">
          <h4 className="text-4xl font-bold mb-6">
            Create your tweet & monetize it right at start.
          </h4>
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
              <MenuBar
                extraLink={<Link href={"/archive"}>See previous alpha</Link>}
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-7 divide-y-2"
              >
                <div>
                  <div className="mb-6">
                    <p className="font-bold mb-1">Content</p>
                    <p className="text-gray-muted text-xs mb-2">
                      This content is what your follower will see after unlock
                      the tweet.
                    </p>
                    <textarea
                      className="rounded-md py-2 px-4 w-full"
                      rows={6}
                      {...register("content", { required: true })}
                    />
                  </div>
                </div>
                <div className="pt-7 border-gray">
                  <div className="mb-6">
                    <p className="font-bold mb-1">Gated Setting</p>
                    <p className="text-gray-muted text-xs">
                      AlphaTweet is powered by Unlock Protocol, you will need to
                      create lock in order to gate this tweet. Launch{" "}
                      <span className="font-bold">Unlock Dashboard</span>
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold text-sm mb-2">
                      Network of the Lock
                    </p>
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
                  </div>
                  <div className="mb-7">
                    <p className="text-sm font-bold mb-2">Lock address</p>
                    <input
                      className="py-2 px-4 rounded-md w-full"
                      placeholder="0x...."
                      {...register("lock", {
                        required: true,
                        validate: (value) => {
                          return !!value.match(/^0x[a-fA-F0-9]{40}$/);
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="pt-7">
                  <div className="mb-7">
                    <p className="font-bold mb-1">Preview text</p>
                    <p className="text-gray-muted text-xs mb-2">
                      This is when your follower reshare this AlphaTweet, the
                      preview text in their tweets.
                    </p>
                    <textarea
                      className="rounded-md py-2 px-4 w-full"
                      rows={2}
                      {...register("preview", { required: true })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray text-white py-3 rounded-full"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Template>
  );
};

export default Home;
