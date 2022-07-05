import { ethers } from "ethers";
import atob from "atob";
import prisma from "../../../lib/prisma";
import auth from "../../../lib/middlewares/auth";
import isMember from "../../../lib/isMember";

export const getAlphaTwtById = async (id) => {
  const alphaTwt = await prisma.alphaTwt.findFirst({
    where: {
      id: parseInt(id),
      published: true,
    },
  });
  if (!alphaTwt) {
    return null;
  }
  delete alphaTwt.content;
  return alphaTwt;
};

async function handle(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(404).json({ error: "missing id" });
  }

  const alphaTwt = await prisma.alphaTwt.findFirst({
    where: {
      id: parseInt(id),
      published: true,
    },
  });

  if (!alphaTwt) {
    return res.status(404).json({ error: "not found" });
  }

  if (!req.signer) {
    delete alphaTwt.content;
    return res.json(alphaTwt);
  }

  let hasMembership = false;
  try {
    hasMembership = await isMember(alphaTwt.network, alphaTwt.lock, req.signer);
  } catch (err) {
    console.log(err);
  }

  if (!hasMembership) {
    // delete alphaTwt.content;
    return res.json(alphaTwt);
  }

  return res.json(alphaTwt);
}

export default auth(handle);
