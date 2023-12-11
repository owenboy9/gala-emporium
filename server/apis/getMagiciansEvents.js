export default function (server, db) {

  server.get('/api/getMagiciansEvents', async (req, res) => {
    const events = await db.query("SELECT * FROM magicians_events")
    res.json(events)
    console.log(events)
  })


}