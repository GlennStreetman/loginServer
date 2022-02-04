// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import sha512 from "./../../functions/sha512";

interface thisRequest extends NextApiRequest {
    body: reqData;
}

type reqData = {
    email: string;
    password: string;
};

type resData = {
    message: string;
};

export default async function handler(req: thisRequest, res: NextApiResponse<resData>) {
    const prisma = new PrismaClient();
    async function main() {
        const getUserID: object | null = await prisma.users.findMany({
            where: {
                email: req.body.email,
                password: sha512(req.body.password),
            },
        });
        console.log("userid", getUserID);
        return getUserID;
    }

    const data = await main()
        .catch((e) => {
            throw e;
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

    console.log("---API REQUEST---", data[0]);
    res.status(200).json(data[0]);
}

//validate email
//validate password
//make sure account is not already registered

//create password recovery route. (THIS WILL REQUIRE AN EMAIL SERVER)
