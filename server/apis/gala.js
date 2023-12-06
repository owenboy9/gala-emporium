export default function (server, db) {
  
  server.get('/api/gala', async (req, res) => {
    const gala = await db.query("SELECT * FROM gala")
    res.json(gala)
  })
}