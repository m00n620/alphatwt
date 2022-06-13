import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Select from "react-select";
import Link from 'next/link'
import Template from '../Components/Template'

import { AuthContext } from "../lib/contexts/auth";
import ConnectWallet from "../Components/ConnectWallet";
import useAlphaTwt from "../lib/hooks/useAlphaTwt"
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
  const { create } = useAlphaTwt()
  const [route, setRoute] = useState();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "Title",
      preview: "This is the preview text",
      content: "This is the content",
      network: networks[0].value,
      lock: '0xAF55e472Dc785f1613a346246E5B271Bf233219E'
    }
  });
  const router = useRouter();

  const onSubmit = async (alphatwt) => {
    const { result: { id }, success } = await create(alphatwt)
    if (success) {
      router.push(`/p/${id}`);
    } else {
      alert('There was an error!')
    }
  };


  return (
    <Template showLeft extraHead={null} extraLink={<Link href={"/archive"}>previous alphatweets</Link>}>
      {!code && <ConnectWallet />}
      {code && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            <label>
              Title:
              <input
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
    </Template>
  );
};

export default Home;
