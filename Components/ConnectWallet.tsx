export const ConnectWallet = () => {
  const connectWallet = async (e) => {
    window.location.href = `https://app.unlock-protocol.com/checkout?client_id=${window.location.host}&redirect_uri=${window.location.href}`;
  };

  return <button onClick={connectWallet}>Connect your wallet!</button>;
};

export default ConnectWallet;
