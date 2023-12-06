// add REST API:s

import events from "./apis/events.js";
import login from "./apis/login.js";
import users from "./apis/users.js"
import events_sorted from "./apis/createview-events.js"
import clubs from "./apis/clubs.js"
import getclub from "./apis/getclub.js"
import getParrotEvents from "./apis/getParrotEvents.js";
import getNotDeadYetEvents from "./apis/getNotDeadYetEvents.js";
import getAkzeptoEvents from "./apis/getAkzeptoEvents.js";


export default function (server, db) {
  // connect rest api:s to web server and database
  events(server, db)
  login(server, db)
  users(server, db)
  events_sorted(server, db)
  clubs(server, db)
  getclub(server, db)
  getParrotEvents(server, db)
  getNotDeadYetEvents(server, db)
  getAkzeptoEvents(server, db)
}