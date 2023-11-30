export default function (server, db) {

  server.get('/api/books', async (req, res) => {
    const result = await db.query("SELECT * FROM books")
    res.json(result)
  })

  server.get('/api/books/:id', async (req, res) => {
    const result = await db.query("SELECT * FROM books WHERE id = ?", [req.params.id])
    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.json({ message: "No book" })
    }
  })

  server.post('/api/books', async (req, res) => {
    if (req.body.name.trim().length > 0) {
      const result = await db.query("INSERT INTO books (name) VALUES (?)", [req.body.name])
      result.bookUpdated = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ bookUpdated: false })
    }
  })

  server.put('/api/books/:id', async (req, res) => {
    if (req.body.name.trim().length > 0) {
      const result = await db.query("UPDATE books SET name = ? WHERE id = ?", [req.body.name, req.params.id])
      result.bookUpdated = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ bookUpdated: false })
    }
  })

  server.delete('/api/books/:id', async (req, res) => {
    const result = await db.query("DELETE FROM books WHERE id = ?", [req.params.id]);
    if (result.affectedRows > 0) {
      res.json({ message: "Book deleted successfully" })
    } else {
      res.json({ message: "No book was deleted" })
    }
  })

}