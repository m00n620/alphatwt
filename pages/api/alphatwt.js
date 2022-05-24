import prisma from "../../lib/prisma";
import { ethers } from "ethers";
import { hashCode } from "./../../lib/utils";
import atob from "atob";

export default async function handle(req, res) {
  const { alphatwt, userCode } = req.body;
  const code = JSON.parse(atob(userCode));
  const creator = ethers.utils.verifyMessage(code.d, code.s);

  const result = await prisma.alphaTwt.create({
    data: {
      ...alphatwt,
      creator,
      published: true,
    },
  });
  res.json({
    hello: "world",
  });
}
