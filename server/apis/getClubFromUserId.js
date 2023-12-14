export default function (server, db) {

server.get('/api/getClubFromUserId/:id', async (req, res) => {

  const query = `
  SELECT clubs.*
  FROM users
  JOIN club_owners ON users.id = club_owners.user_id
  JOIN clubs ON club_owners.club_id = clubs.id
  WHERE users.id = ?;
  `

  const club = await db.query(query, [req.params.id])
  res.json(club)
  console.log(club)
})


}