import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const logout  = async function(cookieHeader){

    console.log('logging out', cookieHeader)
    
    await prisma.session.deleteMany({
        where: {
            sessionToken: cookieHeader['__Secure-next-auth.session-token']
        },
    })


    return true
}

export default async function handler(req , res) {
    try {
    console.log('request remote loggout')
    if (req.method === 'GET') {
        //build headers from string.
        const cookieHeader = req.headers.cookie.split(';').reduce((prev, cur)=>{
            let [key, val] = cur.split('=')
            key = key.trim()
            cur = cur.trim()
            prev[key] = val
            return prev
            }, {})

            await logout(cookieHeader)

            res.status(200).json({
                message: 'user logged out'
        });
    } else {
        res.status(200).json({
        message: 'GET ONLY'
    })
}
    }catch(err){console.log(err)}
}

