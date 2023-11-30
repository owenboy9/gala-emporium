import addBook from "./pages/addBook.js";
import booklist from "./pages/booklist.js";

async function router() {
  switch (window.location.hash) {
    case "":
      $("main").html("<h1>Start Sida</h1>")
      break;

    case "#booklist":
      $("main").html(await booklist())
      break;

    case "#newBook":
      $("main").html(addBook())
      break;

    default:
      $("main").html("<h1>Denna sidan finns inte!</h1>")
      break;
  }
}

window.onload = router()
window.onhashchange = router