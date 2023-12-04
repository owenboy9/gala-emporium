// add REST API:s

import events from "./apis/events.js";
import login from "./apis/login.js";
import users from "./apis/users.js"
import clubs from "./apis/clubs.js"


export default function (server, db) {
  // connect rest api:s to web server and database
  events(server, db)
  login(server, db)
  users(server, db)
  clubs(server, db)

}