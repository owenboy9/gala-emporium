// add REST API:s

import books from "./apis/books.js";


export default function (server, db) {
  // connect rest api:s to web server and database
  books(server, db)

}