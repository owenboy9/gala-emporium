export default function (server, db) {

  server.get('/api/getIndividualEvents/:id', async (req, res) => {

    const result = await db.query("SELECT events.*, clubs.name AS club_name, clubs.case AS club_case FROM events LEFT JOIN clubs ON clubs.id = events.club_id WHERE events.id = ? ", [req.params.id])
    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.json({
        message: "Event not found",
      })
    }
  })



}