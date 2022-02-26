import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findEmail  = async function(cookieHeader){
    
    const userID = await prisma.session.findUnique({
        where: {
            sessionToken: cookieHeader['__Secure-next-auth.session-token']
        },
        select: {userId: true}

        })

    const thisID = userID?.['userId'] ? userID['userId'] : undefined
    
    if (thisID !== undefined ) {
    const email = await prisma.user.findUnique({
        where: {
            id: thisID
        },
        select: {email: true}

    })
    console.log('email', email)
    return email
   } else {
       return false
   }
}

export default async function handler(req , res) {
    // console.log('request logged')
    if (req.method === 'GET') {
      //build headers from string.
      const cookieHeader = req.headers.cookie.split(';').reduce((prev, cur)=>{
          let [key, val] = cur.split('=')
          key = key.trim()
          cur = cur.trim()
          prev[key] = val
          return prev
        }, {})

        const loginStatus = await findEmail(cookieHeader)

        if (loginStatus !== false) {
            const email = loginStatus.email
            const login = email !== undefined ? 1 : 0

            res.status(200).json({
            email: email,
            login: login,
            });
        } else {
            res.status(200).json({
                login: '0',
            });
        }
}

}

