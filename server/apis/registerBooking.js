export default async function (server, db) {
  server.put('/api/registerBooking/:id', async (req, res) => {
    if (req.body.newTickets > 0) {
      const result = await db.query("UPDATE events SET tickets = ? WHERE id = ?", [req.body.newTickets, req.params.id])
      result.ticketUpdated = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ ticketUpdated: false })
    }
  })

  server.post('/api/registerBooking', async (req, res) => {
    if (req.body.no_tickets > 0) {
      const result = await db.query("INSERT INTO bookings (event_id, booking_no, no_tickets) VALUES (?, ?, ?)", [req.body.event_id, req.body.booking_no, parseInt(req.body.no_tickets)])

      result.bookingAdded = true
      res.json(result)
      console.log("Result - ", result);
    } else {
      res.status(401)
      res.json({ bookingAdded: false })
    }
  })
}