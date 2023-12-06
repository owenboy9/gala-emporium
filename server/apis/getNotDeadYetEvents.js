export default function (server, db) {

  server.get('/api/getNotDeadYetEvents', async (req, res) => {
    const events = await db.query("SELECT * FROM notDeadYet_events")
    res.json(events)
    console.log(events)
  })


}