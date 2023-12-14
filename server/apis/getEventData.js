export default function (server, db) {

  server.get('/api/getEventData/:id', async (req, res) => {

    const result = await db.query("SELECT * FROM events WHERE id = ?", [req.params.id])
    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.json({
        message: "Event not found",
      })
    }
  })



}