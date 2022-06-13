import getSigner from "../getSigner";

export const auth = (handler) => {
  return async (req, res) => {
    if (!!req.headers.authorization) {
      let signer;
      if ((signer = getSigner(req.headers.authorization))) {
        req.signer = signer;
      }
    }
    return handler(req, res);
  };
};

export default auth;
