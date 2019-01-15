// import {Request, Response} from "express"
import express from "express"
import * as jwksRsd from 'jwks-rsa'
import * as expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as fs from 'fs'

const privateKey = 'secretkey'

const app = express()
app.use(bodyParser.json())


app.route('/test').get((req,res) => {
  res.json({'reply': 'hel'})
})

app.route('/api/login').post(loginRoute)
// checkIfAuthenticated: middleware checking

app.route('/api/lessons').get(verifyToken, (req,res) => {

  jwt.verify(req.token, privateKey, (err, authData) => {
    if (err){
      res.sendStatus(403)
    } else {
      res.json({lesson: ['a', 'b', 'c'], authData })
    }
  })
})


// const rsa_key = fs.readFileSync('./demos/private.key')


function loginRoute(req, res){
  const email = req.body.email
  const password = req.body.password

  if (email == 'abc', password == '123456' ){
    const user = {
      id: 1,
      username: 'brad',
      email: 'brad@gmail.com'
    }

    // const jwtBearerToken = 
    jwt.sign({user}, privateKey, {expiresIn: '20s'}, (err,token) => {
      // algorithm: 'RS256',
      // expiresIn: 120,
      // subject: userId
      res.json({
        token
      })
    })

    // res.cookie("SESSIONID", jwtBearerToken, {httpOnly: true}) // secure: true

    // res.status(200).join({
    //   idToken: jwtBearerToken,
    //   // expiresIn: 
    // })
    
  } else {
    res.sendStatus(401)
  }
  
}

// verifyToken
// const verifyToken = expressJwt({
//   secret: jwksRsd.expressJwtSecret({
//     cache: true,
//     rateLimit: true,  // library won't make >10 requests / min
//     jwksUri: "./demos/jwks.json"
//   }),
//   algorithm: ['RS256']
// })


function verifyToken(req,res,next) {
  console.log(req.headers);
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()

  } else {
    // forbidden
    res.sendStatus(403)
  }
}



const port = process.env.PORT || 4001;
app.listen(port, err => {
  if (err){
    console.error(err);
  } else {
    console.log('listening on port', port);
  }
})







