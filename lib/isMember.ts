const ethers = require("ethers");

/**
 * Returns a public RPC endpoint for a network id
 * @param network
 * @returns
 */
const providerUrl = (network: number) => {
  switch (network) {
    case 56:
      return "https://bsc-dataseed.binance.org/";
    case 80001:
      return "https://matic-mumbai.chainstacklabs.com";
    case 10:
      return "https://mainnet.optimism.io";
    case 137:
      return "https://polygon-rpc.com/";
    case 4:
      return "https://rinkeby-light.eth.linkpool.io";
    case 1:
      return "https://cloudflare-eth.com";
    case 100:
      return "https://rpc.xdaichain.com/";
    default:
      throw new Error("Invalid Network!");
  }
};

/**
 * Returns de Promise that resolves to true of member has a valid key on the lockAddress contract on network
 * @param network
 * @param lockAddress
 * @param member
 * @returns
 */
const isMember = (network: number, lockAddress: string, member: string) => {
  const abi = [
    {
      constant: true,
      inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
      name: "getHasValidKey",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const provider = new ethers.providers.JsonRpcProvider(providerUrl(network));
  const lock = new ethers.Contract(lockAddress, abi, provider);
  return lock.getHasValidKey(member);
};

export default isMember;
