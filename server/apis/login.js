export default function(server, db){


server.post('/api/login', async(req, res) => {
  // perform login
  const users = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [req.body.email, req.body.password])
  if(users[0]){
    req.session.user = users[0]
    res.json({loggedIn: true})
  }else{
    res.status(401)
    res.json({loggedIn: false})
  }
})



}