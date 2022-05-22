import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react";

const getAdmin = async (req, res) => {
    const prisma = new PrismaClient()
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.roll === "admin") {
        const findSecret = await prisma.User.findUnique({
            where: {
                email: session.user.email
            }
        });
        res.status(200).json({ secret: findSecret.secret });
    } else {
        console.log("not an admin");
        res.status(200).json({ secret: 'FORBIDDEN' });
    }
    res.end();
};

export default getAdmin