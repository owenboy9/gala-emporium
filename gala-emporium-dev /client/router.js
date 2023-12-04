import eventList from "./pages/eventList.js";
import userList from "./pages/userList.js";
import clubs from "./pages/clubs.js";

async function router() {
  switch (window.location.hash) {
      case "":
        console.log(window.location.hash)
      $("main").html("<h1>Startsida</h1>")
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

    default:
      $("main").html("<h1>Denna sida finns inte!</h1>")
      break;
  }
}

window.onload = router
window.onhashchange = router