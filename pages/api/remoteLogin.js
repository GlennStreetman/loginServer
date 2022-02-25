import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
  })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {


        if (result instanceof Error) {
            console.log('error processing cors')
          return reject(result)
        }
        console.log('received CORS')
        return resolve(result)
      })
    })
  }
  

export default async function handler(req , res) {
    console.log('request logged')
    if (req.method === 'GET') {
        console.log('api request received remotelogin')
        const loginStatus = await runMiddleware(req, res, cors)

        res.status(200).json({
        message: 'test'
    });
}

}
