import prisma from "../../lib/prisma";
import Head from "next/head";
import { useEffect, useContext, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";

import { getAlphaTwtById } from "../api/alphatwt/[id]";

import ConnectWalletUnlock from "../../Components/ConnectWalletUnlock";
import UnlockIt from "../../Components/UnlockIt";
import Template from "../../Components/Template";

import { AuthContext } from "../../lib/contexts/auth";
import getSigner from "../../lib/getSigner";
import useAlphaTwt from "../../lib/hooks/useAlphaTwt";
import { shortenAddress } from "../../lib/utils";
import { getNetworkName } from "../../config/networks";
import Link from "next/link";

// This gets called on every request to do SSR so that we can have nice previews on Twitter!
export async function getServerSideProps(context) {
  const post = await getAlphaTwtById(context.params.id);
  return { props: { post } };
}

/**
 * TODO :
 * - add way to automatically render preview images!
 * @returns
 */
const MetadataPreview = ({ post }) => {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@viaAlphatwt" />
      <meta name="twitter:title" content={post?.title} />
      <meta name="twitter:description" content={post?.summary} />
      {/* <meta
        name="twitter:image"
        content="https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg"
      /> */}
    </>
  );
};

/**
 * TODO: handler not found!
 * @param props
 * @returns
 */
const AlphaTwt = (props) => {
  const { retrieve } = useAlphaTwt();
  const [post, setPost] = useState(props.post);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { code } = useContext(AuthContext);

  const signer = useMemo(() => {
    if (code) {
      return getSigner(code);
    }
  }, [code]);

  useEffect(() => {
    const fetchPost = async (id, code) => {
      setPost(await retrieve(id));
      setIsLoading(false);
    };

    if (router.query.id) {
      fetchPost(router.query.id, code);
    }
  }, [code, router.query.id]);

  // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
  const tweetIt = useCallback(() => {
    /**
     * text, url, hashtags, via, related,
     */
    const alphaTwtUrl = new URL(window.location.href);
    let referrer = getSigner(code);
    if (referrer) {
      alphaTwtUrl.searchParams.append("referrer", referrer);
    }

    const base = new URL("https://twitter.com/intent/tweet");
    base.searchParams.append("url", alphaTwtUrl.toString());
    base.searchParams.append("text", `${post.preview}\n\n`);
    window.location.href = base.toString();
  }, [post]);

  return (
    <Template title={post?.title} extraHead={<MetadataPreview post={post} />}>
      {post && (
        <article className="max-w-[632px] mx-auto">
          <div className="bg-gray-100 p-2 flex justify-between items-center text-sm rounded-lg mb-8">
            <span className="font-semibold">Tweet by</span>
            <span>
              {shortenAddress(post.signer)}
              {post.signer === signer ? " (that's you!)" : ""}
            </span>
          </div>
          {/* <h2>{post.title}</h2>
          <p>{post.preview}</p> */}
          {post.content && (
            <>
              <p className="text-2xl mb-16">{post.content}</p>
              <div className="w-full bg-gray-100 rounded-lg p-4 mb-16">
                <p className="font-semibold text-sm mb-2">Lock info</p>
                <p>
                  {getNetworkName(post.network)} | {post.lock}
                </p>
              </div>
              <button
                className="bg-gray text-white w-full rounded-full py-3"
                onClick={tweetIt}
              >
                Post on Twitter
              </button>
              <div className="flex justify-center mt-10 font-bold">
                <Link href={"/archive"}>See all my alpha tweets</Link>
              </div>
            </>
          )}
          {!isLoading && !post.content && code && (
            <>
              <UnlockIt post={post} />
              <div className="flex justify-center mt-10 font-bold">
                <Link href={"/archive"}>See all my alpha tweets</Link>
              </div>
            </>
          )}
          {!post.content && !code && <ConnectWalletUnlock />}
        </article>
      )}
    </Template>
  );
};

export default AlphaTwt;
