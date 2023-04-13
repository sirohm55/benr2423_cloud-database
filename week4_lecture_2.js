//express library for creating own service
//npm init allows you to install some libraries

const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');

app.use(express.json()) //only once, req = request, res = response
app.post('/login', (req, res) => {
  console.log (req.body)

  let result = login(req.body.username, req.body.password)

  let token = generateToken (result)
  res.send(token)
})

app.post('/register', (req, res) => {
  console.log (req.body)

  let result = register(req.body.UN, req.body.PS, req.body.NM, req.body.EM)

  res.send("register successfully")
})


app.get('/', verifyToken,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//default cns = 80
//ftp = 21
let dbuser = [
  {
      username: "tan",
      password: "12344",
      name: "tan jun yan",
      email: "junyantan95@gmail.com"
  },

  {
      username: "nick",
      password: "36554",
      name: "nicolas Sii Ting Kie",
      email: "nickolas@yahoo.com"

  },

  {
      username : "Ho",
      password : "44885",
      name : "Ho Zhe Heng",
      email : "ho334@yahoo.com"
  }
]

function login (requsername, reqpassword){
  let matchuser = dbuser.find (
      user => user.username == requsername
  )
  console.log ()
  if (!matchuser)
      return "invalid username"
  //console.log (matchuser)
  if (matchuser.password == reqpassword)
      return matchuser
  else
      return "Invalid password"

}

function register (Username, Password, Name, Email){
  dbuser.push({
      username: Username,
      password: Password,
      name: Name,
      email: Email
  })

}

function generateToken (userData) {

    const token = jwt.sign(userData, 'inipassword',{expiresIn: 60*60}) //protect
     //in second
    return token
}

function verifyToken (req, res, next){    //make sure the token(in http header) is correct
    let header = req.headers.authorization
    console.log (header)

    let token = header.split (' ')[1]

    jwt.verify (token, 'inipassword', function(err, decoded){
        if(err){
            res.send("Invalid Token")
        }

        req.user = decoded
        next ()
    
});



}