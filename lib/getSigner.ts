import { ethers } from "ethers";
import atob from "atob";

export const getSigner = (authCode) => {
  try {
    const auth = JSON.parse(atob(authCode));

    // TODO: parse auth.d to ensure that expiration is not reached and/or verify nonce

    return ethers.utils.verifyMessage(auth.d, auth.s);
  } catch (error) {
    console.error(`Failed to authenticate ${authCode}`);
    return false;
  }
};

export default getSigner;
