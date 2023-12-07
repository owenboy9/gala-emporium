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
<<<<<<< HEAD
    const events = await db.query("SELECT * FROM events_sorted")
=======
    const events = await db.query(
      "SELECT DISTINCT events_sorted.*, clubs.name AS club_name, media.logo_square AS logo FROM events_sorted LEFT JOIN clubs ON clubs.id = events_sorted.club_id LEFT JOIN media ON media.club_id = events_sorted.club_id AND media.keyword = 'logo_square' ORDER BY events_sorted.start_time;")
>>>>>>> dev
    res.json(events)
    console.log(events)
  })
  
   

  }

<<<<<<< HEAD
/*   server.get('/api/events_sorted', async (req, res) => {
=======
/*   
"SELECT events_sorted.*, (SELECT name FROM clubs WHERE clubs.id = events_sorted.club_id) AS club_name, (SELECT logo_square FROM media WHERE media.club_id = events_sorted.club_id) AS logo FROM events_sorted ORDER BY events_sorted.start_time;"
SELECT events_sorted.*, clubs.*, media.logo_square AS logo FROM events_sorted JOIN clubs ON clubs.id = events_sorted.club_id JOIN media ON media.club_id = clubs.id ORDER BY events_sorted.start_time ASC;
"SELECT * FROM events_sorted"

server.get('/api/events_sorted', async (req, res) => {
>>>>>>> dev
    const events = await db.query("SELECT * FROM events_sorted")
    res.json(events)
    console.log('events in createview', events)
  }) */


