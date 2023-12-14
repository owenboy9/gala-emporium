export default function(server, db) {

  server.get('/api/getParrotEvents', async (req, res) => {
    const events = await db.query("SELECT * FROM parrot_events")
    res.json(events)
    console.log(events)
  })  


}