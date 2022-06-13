const buildCheckoutUrl = (lock: string, network: number) => {
  const paywallConfig = {
    locks: {
      [lock]: {
        network,
      },
    },
    referrer: undefined,
    pessimistic: true,
  };
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.get("referrer")) {
    paywallConfig.referrer = urlSearchParams.get("referrer");
  }

  const base = new URL("https://app.unlock-protocol.com/checkout");
  base.searchParams.append("redirectUri", window.location.href);
  base.searchParams.append("paywallConfig", JSON.stringify(paywallConfig));
  return base.toString();
};

export const UnlockIt = ({ post }) => {
  const unlockIt = async () => {
    window.location.href = buildCheckoutUrl(post.lock, post.network);
  };

  return (
    <p>
      <button onClick={unlockIt}>Unlock It</button>
    </p>
  );
};

export default UnlockIt;
