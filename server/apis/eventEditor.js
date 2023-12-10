export default function (server, db) {

  server.get('/api/eventEditor/:id', async (req, res) => {
    const events = await db.query("SELECT events.*, clubs.name AS clubname, users.user_name AS username FROM users JOIN club_owners ON users.id = club_owners.user_id JOIN clubs ON club_owners.club_id = clubs.id JOIN events ON clubs.id = events.club_id WHERE users.id = ?;", [req.params.id])
    res.json(events)
    console.log(events)
  })

  server.put('/api/eventEditor/:id', async (req, res) => {
    if (req.body.headline.trim().length > 0) {
      const result = await db.query("UPDATE events SET headline = ? AND description_short = ? AND description_long = ? AND ticket_price = ? AND tickets = ? AND start_time = ? AND end_time = ? WHERE id = ?", [req.body.headline, req.body.description_short, req.body.description_long, req.body.ticket_price, req.body.tickets, req.body.start_time, req.body.end_time, req.params.id])
      result.bookUpdated = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ eventUpdated: false })
    }
  })



}