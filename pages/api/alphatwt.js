import prisma from '../../lib/prisma';
import { ethers } from "ethers";
import { hashCode } from './../../lib/utils'

export default async function handle(req, res) {
    const { alphatwt, signature, message } = req.body
    const payload = JSON.stringify(alphatwt);
    const creator = await ethers.utils.verifyMessage(message, signature)
    const [_, hash, time] = message.split('\n')
    const hashValue = hash.match(/Hash: (.*)/)
    const timeValue = time.match(/Time: (.*)/)
    if (hashCode(payload) !== parseInt(hashValue[1], 10)) {
        return res.json({
            error: "bad payload"
        })
    }
    if (new Date().getTime() - new Date(timeValue[1]).getTime() - new Date > 1000 * 60) {
        return res.json({
            error: "payload too old!"
        })
    }
    const result = await prisma.alphaTwt.create({
        data: {
            ...alphatwt,
            creator,
            published: true,
        },
    });
    res.json({
        hello: 'world'
    });
}