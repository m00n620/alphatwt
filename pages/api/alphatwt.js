import { ethers } from "ethers";
import atob from "atob";
import NextCors from "nextjs-cors";
import prisma from "../../lib/prisma";
import { hashCode } from "./../../lib/utils";

export default async function handle(req, res) {
  try {
    console.log("hit the api");

    const { alphatwt, signer } = req.body;
    // TODO: if no alphatwt or signer throw error

    // const code = JSON.parse(atob(userCode));
    // const creator = ethers.utils.verifyMessage(code.d, code.s);

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
    // if (e instanceof prisma.PrismaClientKnownRequestError) {
    //   // The .code property can be accessed in a type-safe manner
    //   if (e.code === "P2002") {
    //     console.log(
    //       "There is a unique constraint violation, a new user cannot be created with this email"
    //     );
    //   }
    // }
    // throw e;
    res.json({
      e,
      message: e.message,
    });
  }
}
