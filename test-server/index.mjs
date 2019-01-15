// import {Request, Response} from "express"
import * as express from "express"
import * as jwt from 'jsonwebtoken'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as fs from 'fs'

const app = express()
app.use(bodyParser.json())

app.route('/api/login').post(loginRoute)

const rsa_key = fs.readFileSync('./demos/private.key')

export function loginRoute(req, res){
  const email = req.body.email
  const password = req.body.password

  if (validateEmailAndPassword()){
    const userId = findUserIdForEmail(email)

    const jwtBearerToken = jwt.sign({}, rsa_key, {
      algorithm: 'RSA256',
      expiresIn: 120,
      subject: userId
    })
  } else {
    res.sendStatus(401)
  }

  
}



