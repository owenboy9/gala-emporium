export default function (server, db) {

  server.get('/api/users', async (req, res) => {
    const users = await db.query("SELECT * FROM users")
    res.json(users)
    console.log(users)
  })

  /* server.post('/api/books', async (req, res) => {
    if (req.body.name.trim().length > 0) {
      const result = await db.query("INSERT INTO books (name) VALUES (?)", [req.body.name])
      result.bookAdded = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ bookAdded: false })
    }
  })

  server.put('/api/books/:id', (req, res) => {
  })

  server.delete('/api/books/:id', (req, res) => {
  })
 */
}