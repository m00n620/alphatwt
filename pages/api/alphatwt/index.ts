import prisma from "../../../lib/prisma";
import auth from "../../../lib/middlewares/auth";

async function handle(req, res) {
  try {
    const { alphatwt } = req.body;

    const result = await prisma.alphaTwt.create({
      data: {
        ...alphatwt,
        signer: req.signer,
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

export default auth(handle);
