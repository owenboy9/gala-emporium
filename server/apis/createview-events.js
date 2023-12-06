export default async function createView (server, db) {



  /* server.get('/api/sorted-events', async(req, res) => {

   await db.query("DROP VIEW IF EXISTS events_sorted;")

    const createViewQuery = `
    CREATE VIEW events_sorted AS
    SELECT *
    FROM events 
    WHERE start_time > NOW()
    ORDER BY start_time ASC;
  `
    await db.query(createViewQuery, (error) => {
    if (error) {
      console.error('Error creating view:', error);
    } else {
      console.log('View created successfully.');
    }
  })


  }) */


  server.get('/api/sorted-events', async (req, res) => {
    const events = await db.query("SELECT * FROM events_sorted")
    res.json(events)
    console.log(events)
  })
  
   

  }

/*   server.get('/api/events_sorted', async (req, res) => {
    const events = await db.query("SELECT * FROM events_sorted")
    res.json(events)
    console.log('events in createview', events)
  }) */


