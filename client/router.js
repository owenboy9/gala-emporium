import eventList from "./pages/eventList.js";
import userList from "./pages/userList.js";
import clubs from "./pages/clubs.js";
import parrot from "./pages/clubpages/parrotprattlecracker/parrotprattlecracker.js";
import akzepto from "./pages/clubpages/akzepto/akzepto.js";
import notdeadyet from "./pages/clubpages/notdeadyet/notdeadyet.js";


import login from "./components/login.js"

$('#login').html(login())


async function router() {
  switch (window.location.hash) {
    case "":
      console.log(window.location.hash)
      $("#left").html("<h1>hämtar från databas</h1>")
      $("#right").html(await eventList())
      break;

    case "#getClubs":
      $("main").html(await clubs())
      break;

    case "#getEvents":
      $("main").html(await eventList())
      break;


    case "#about":
      console.log(window.location.hash)
      $("main").html('<h1>About us</h1>')
      break;

    case "#parrot":
      $("main").html(await parrot())
      break;
    
    case "#akzepto":
      $("main").html(await akzepto())
      break;

    case "#notdeadyet":
      $("main").html(await notdeadyet())
      break;

    default:
      $("main").html("<h1>Denna sida finns inte!</h1>")
      break;
  }
}

window.onload = router
window.onhashchange = router
