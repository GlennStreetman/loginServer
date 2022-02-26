// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import sha512 from "./../../functions/sha512";
import { serialize, CookieSerializeOptions } from "cookie";

type reqData = {
    email: string;
};

interface thisRequest extends NextApiRequest {
    body: reqData;
}

type resData = {
    email?: string;
    message: string;
};

type queryReturnData = {
    email: string;
};

type queryReturnList = queryReturnData[];

export default async function handler(req: thisRequest, res: NextApiResponse<resData>) {
    const prisma = new PrismaClient();
    async function main() {
        const getUserID: queryReturnList | null = await prisma.user.findMany({
            where: {
                email: req.body.email,
            },

        });
        return getUserID;
    }

    const data = await main()
        .catch((e) => {
            throw e;
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

    if (data && data.length === 1) {
        res.setHeader(
            "Set-Cookie",
            serialize("test", "testString", {
                secure: false,
                sameSite: true,
            })
        );
        res.status(200).json({
            message: "login success",
        });
    } else {
        res.status(401).json({ message: "Failed login, check email and password." });
    }
}
