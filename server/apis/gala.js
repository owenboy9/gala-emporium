export default function (server, db) {

  server.get('/api/gala', async (req, res) => {
    const present = await db.query("SELECT * FROM gala")
    console.log(present)
    res.json(present)
  })

}