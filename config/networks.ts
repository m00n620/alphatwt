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

export const getNetworkName = (chainId: number) => {
  const network = networks.find((network) => network.value === chainId);
  if (network) return network.label;

  return "";
};

export default networks;
