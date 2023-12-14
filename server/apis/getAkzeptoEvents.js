export default function (server, db) {

  server.get('/api/getAkzeptoEvents', async (req, res) => {
    const events = await db.query("SELECT * FROM akzepto_events")
    res.json(events)
    console.log(events)
  })


}