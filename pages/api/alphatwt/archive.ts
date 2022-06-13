import prisma from "../../../lib/prisma";
import auth from "../../../lib/middlewares/auth";

async function handle(req, res) {
  try {
    const result = await prisma.alphaTwt.findMany({
      where: {
        signer: req.signer,
      },
    });
    res.json(result);
  } catch (e) {
    res.json({
      e,
      message: e.message,
    });
  }
}

export default auth(handle);
