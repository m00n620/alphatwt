import { ethers } from "ethers";
import atob from "atob";
import NextCors from "nextjs-cors";
import prisma from "../../lib/prisma";
import { hashCode } from "./../../lib/utils";

export default async function handle(req, res) {
  try {
    console.log("hit the api");

    const { alphatwt, code } = req.body;
    // TODO: if no alphatwt or signer throw error
    const auth = JSON.parse(atob(code));
    // The code object has 2 properties:
    // d: digest (the signed string)
    // s: signature (the signature)
    const signer = ethers.utils.verifyMessage(auth.d, auth.s);

    const result = await prisma.alphaTwt.create({
      data: {
        ...alphatwt,
        signer,
        published: true,
      },
    });
    res.json({
      result,
      success: "true",
    });
  } catch (e) {
    res.json({
      e,
      message: e.message,
    });
  }
}
