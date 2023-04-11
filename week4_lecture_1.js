//express library for creating own service
//npm init allows you to install some libraries

const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) //only once, req = request, res = response
app.post('/login', (req, res) => {
  console.log (req.body)

  let result = login(req.body.username, req.body.password)

  res.send(result)
})

app.post('/register', (req, res) => {
  console.log (req.body)

  let result = register(req.body.UN, req.body.PS, req.body.NM, req.body.EM)

  res.send("register successfully")
})


app.get('/', (req, res) => {
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