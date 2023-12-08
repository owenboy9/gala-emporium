import eventList from "./pages/eventList.js";
import userList from "./pages/userList.js";
import clubs from "./pages/clubs.js";
import parrot from "./pages/clubpages/parrotprattlecracker/parrotprattlecracker.js";
import notdeadyet from "./pages/clubpages/notdeadyet/notdeadyet.js";
import gala from "./pages/gala/gala.js";


import login from "./components/login.js"

$('#login').html(login())


async function router() {
  switch (window.location.hash) {
    case "":
      console.log(window.location.hash)
      $("#left").html(await gala())
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
      $("main").html(await gala())
      break;

    case "#parrot":
      $("main").html(await parrot())
      break;

    case "#notdeadyet":
      $("main").html(await notdeadyet())
      break;

    default:
      $("main").html("<h1>Denna sida finns inte!</h1>")
      break;
  }
}


function handleAnchorClick(event) {
  //event.preventDefault()
  router()
}

document.addEventListener('DOMContentLoaded', function () { 
  let reloadAnchor = document.querySelector('.reload-anchor')
  if (reloadAnchor) {
    reloadAnchor.addEventListener('click', handleAnchorClick)
  }
})


window.onload = router
window.onhashchange = router
