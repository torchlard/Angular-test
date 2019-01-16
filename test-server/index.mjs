// import {Request, Response} from "express"
import express from "express"
import * as jwksRsd from 'jwks-rsa'
import * as expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fs from 'fs'

const privatekey = fs.readFileSync('./demos/private.key')
// const privateKey = 'secretkey'

const app = express()
app.use(bodyParser.json())
app.use((req,res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Accept, X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next()
})

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
    jwt.sign({user}, privateKey, {expiresIn: '1800s'}, (err,token) => { // 
      // algorithm: 'RS256',
      // expiresIn: 120,
      // subject: userId
      res.json({
        token: token,
        expiresIn: 1800
      })
    })

  } else {
    res.sendStatus(401)
  }
  
}


function verifyToken(req,res,next) {
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







