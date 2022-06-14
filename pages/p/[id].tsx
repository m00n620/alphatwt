import prisma from "../../lib/prisma";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useEffect, useContext, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/contexts/auth";
import ConnectWallet from "../../Components/ConnectWallet";
import useAlphaTwt from "../../lib/hooks/useAlphaTwt";
import UnlockIt from "../../Components/UnlockIt";
import Template from "../../Components/Template";
import getSigner from "../../lib/getSigner";
import { getAlphaTwtById } from "../api/alphatwt/[id]";

// This gets called on every request to do SSR so that we can have nice previews on Twitter!
export async function getServerSideProps(context) {
  const post = await getAlphaTwtById(context.params.id);
  return { props: { post } };
}

/**
 * TODO:
 * - add way to automatically render preview images!
 * @returns
 */
const MetadataPreview = ({ post }) => {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@viaAlphatwt" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.summary} />
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
  const [error, setError] = useState(null);
  const router = useRouter();
  const { code } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async (id, code) => {
      setPost(await retrieve(id));
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
    <Template
      showLeft={false}
      title={post?.title}
      extraHead={<MetadataPreview post={post} />}
      extraLink={null}
    >
      {post && (
        <article>
          <h2>{post.title}</h2>
          <p>{post.preview}</p>
          {post.content && (
            <>
              <p>{post.content}</p>
              <button onClick={tweetIt}>Tweet it!</button>
            </>
          )}
          {!post.content && code && <UnlockIt post={post} />}
          {!post.content && !code && <ConnectWallet />}
        </article>
      )}
    </Template>
  );
};

export default AlphaTwt;
