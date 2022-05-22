import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react";

export default async (req, res) => {
    const prisma = new PrismaClient()
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.roll === "admin") {
        const findSecret = await prisma.User.findUnique({
            where: {
                email: session.user.email
            }
        });
        // console.log("resumes", findResumes, "filters", filters);
        res.status(200).json({ secret: findSecret.secret });
    } else {
        console.log("not an admin");
        res.status(200).json({ secret: 'FORBIDDEN' });
    }
    res.end();
};
