export default function (server, db) {

  server.get('/api/eventEditor/:id', async (req, res) => {
    const events = await db.query("SELECT events.*, clubs.name AS clubname, users.user_name AS username FROM users JOIN club_owners ON users.id = club_owners.user_id JOIN clubs ON club_owners.club_id = clubs.id JOIN events ON clubs.id = events.club_id WHERE users.id = ?;", [req.params.id])
    res.json(events)
    console.log(events)
  })

  server.put('/api/eventEditor/:id', async (req, res) => {
    console.log('puttin on the ritz', req.body)
    if (req.body.headline.trim().length > 0) {
      const result = await db.query("UPDATE events SET headline = ?, description_short = ?, description_long = ?, ticket_price = ?, tickets = ? WHERE id = ?", [req.body.headline, req.body.description_short, req.body.description_long, parseInt(req.body.ticket_price, 10), parseInt(req.body.tickets, 10), req.params.id])
      result.eventUpdated = true
      res.json(result)
      console.log("Result - ", result);
    } else {g
      res.status(401)
      res.json({ eventUpdated: false })
    }
  })

// , start_time = ?, end_time = ?
// req.body.start_time, req.body.end_time,

}