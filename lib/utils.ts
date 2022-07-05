export const shortenAddress = (address: any, chars = 4): string => {
  if (address === false) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
};
