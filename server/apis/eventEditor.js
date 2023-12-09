export default function (server, db) {

  server.get('/api/eventEditor/:id', async (req, res) => {
    const events = await db.query("SELECT events.*, clubs.name AS clubname, users.user_name AS username FROM users JOIN club_owners ON users.id = club_owners.user_id JOIN clubs ON club_owners.club_id = clubs.id JOIN events ON clubs.id = events.club_id WHERE users.id = ?;", [req.params.id])
    res.json(events)
    console.log(events)
  })



}