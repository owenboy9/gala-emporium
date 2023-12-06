export default function(server, db) {

  server.post('/api/getclub', async (req, res) => {
    console.log(req.body.clubname)
    // are we logged in? get logged in user
    const club = await db.query("SELECT * FROM clubs WHERE name = ?", [req.body.clubname])
    if(club[0]){
      res.json({club: club[0]})
    }else{
      res.status(401)
      res.json({getclub: false})
    }
  })  



}