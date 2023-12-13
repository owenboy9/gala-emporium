// add REST API:s

import events from "./apis/events.js";
import login from "./apis/login.js";
import users from "./apis/users.js"
import events_sorted from "./apis/createview-events.js"
import clubs from "./apis/clubs.js"
import getclub from "./apis/getclub.js"
import getParrotEvents from "./apis/getParrotEvents.js";
import getMagicansEvents from "./apis/getMagiciansEvents.js";
import getNotDeadYetEvents from "./apis/getNotDeadYetEvents.js";
import getAkzeptoEvents from "./apis/getAkzeptoEvents.js";
import gala from "./apis/gala.js"
import getEventData from "./apis/getEventData.js"
import eventEditor from "./apis/eventEditor.js";
import getClubFromUserId from "./apis/getClubFromUserId.js";
import registerBooking from "./apis/registerBooking.js";


export default function (server, db) {
  // connect rest api:s to web server and database
  events(server, db)
  login(server, db)
  users(server, db)
  events_sorted(server, db)
  clubs(server, db)
  getclub(server, db)
  getParrotEvents(server, db)
  getMagicansEvents(server, db)
  getNotDeadYetEvents(server, db)
  getAkzeptoEvents(server, db)
  gala(server, db)
  getEventData(server, db)
  eventEditor(server, db)
  getClubFromUserId(server, db)
  registerBooking(server, db)
}
