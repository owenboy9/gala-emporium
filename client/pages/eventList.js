import bookTickets from "./bookTickets.js"


async function openTicketPage(eventId) {
  $("main").html(await bookTickets(eventId))
}

window.openTicketPage = openTicketPage