export default async function createView(server, db) {


  server.get('/api/getIndividualEvents/:id', async (req, res) => {

    const result = await db.query("SELECT events.*, clubs.name AS club_name,media.logo_square AS logo FROM events WHERE id = ? LEFT JOIN clubs ON clubs.id = events.club_id LEFT JOIN media ON media.club_id = events.club_id AND media.keyword = 'logo_square' ORDER BY events.start_time;", [req.params.id])
    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.json({
        message: "Event not found",
      })
    }
  })



}