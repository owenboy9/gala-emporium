import event from "./eventList.js"

export default async function (eventId) {
  console.log("Event id i default-funktionen", eventId)
  const event = await getEventData(eventId)

  let jsstarttime = new Date(event.start_time)

  let day = jsstarttime.getUTCDay()
  let date = jsstarttime.getUTCDate()
  let month = jsstarttime.getUTCMonth()
  let year = jsstarttime.getUTCFullYear()

  function padZero(value) {
    return value < 10 ? `0${value}` : `${value}`
  }

  let startHour = padZero(jsstarttime.getUTCHours())
  let startMinute = padZero(jsstarttime.getUTCMinutes())


  if (startMinute === '0') {
    startMinute = '00'
  }

  let html = `
  <link rel="stylesheet" href="./styles/bookTickets.css">
    <div class="bookTickets">
      <h2>Booking tickets </h2>
      
</div>
       <div id="tickets">
        
        <form>
        <label for="ticketBox">I want to book
          <select id="ticketBox">
           <option numberTickets="1">1</option>
        <option numberTickets="2">2</option>
        <option numberTickets="3">3</option>
        <option numberTickets="4">4</option>
        <option numberTickets="5">5</option>
        <option numberTickets="6">6</option>
          </select>
          tickets for ${event.headline} on the ${date} ${getMonthName(month)}.</br>
          There are currently ${event.tickets} tickets available at ${event.ticket_price} kr each.</br></br>
      
      <button id="confirmButton">Book!</button>
      <input type="hidden" id="eventId" name="eventId" value="${event.id}">
      <input type="hidden" id="eventTickets" name="eventTickets" value="${event.tickets}">

    </form>
    <script>
      const btn = document.querySelector('#confirmButton');
      const sb = document.querySelector('#ticketBox')
      btn.onclick = (event) => {
        event.preventDefault();


      let total = (sb.value)*${event.ticket_price};
       let ok=confirm("You want to book "+sb.value+" tickets. Sum total is "+total+" kr.")
       if (ok=true) {
        const code = generateCode();
                console.log (code);
                console.log(eventId)
                submitBooking (sb.value, code, eventId.value, eventTickets.value)

                let email=prompt("Your tickets are reserved. "+code+" is your booking number. Please present it at the Gala Emporium entrance. *** We accept Mastercard and Visa, Swish and cash in SEK. *** Enjoy your show! *** If you want your reservation details sent to you please enter your e-mail here:") ;
       
       console.log(email)}

;}


      
    </script>
     
     </div>
    `
  return html

}

async function getEventData(eventId) {
  let response = await fetch(`/api/getEventData/${eventId}`)
  let result = await response.json();
  console.log(result)
  return result
}

function getMonthName(month) {
  console.log(month)
  let index = month
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[index]
}
function generateCode() {
  let code = "";
  let letter = "";
  let codeLength = 6;
  let codeBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedefghijklmnopqrstuvxyz1234567890";
  do {
    letter = codeBase.charAt(Math.floor(Math.random() * (62)));
    console.log(letter)
    code = code + letter
    codeLength = codeLength - 1
  }
  while (codeLength > 0);
  return code;
}

window.generateCode = generateCode
/*
let html = `
<link rel="stylesheet" href="./styles/showEvent.css">
    <div class="showEvent">
      <h1>${event.headline}</h1>
      <div class="eventDescr">
      <div class="eventDetails">
      <p class="eventDay">${date} ${getMonthName(month)} ${year} </p>
      <p class="eventTime">${startHour}:${startMinute} </p>
      
      <p class="ticketsLeft">${event.tickets} tickets available</p>
      <p class="price">${event.ticket_price} kr</p>
      </div>
  
      <p>${event.description_long}</p>
      </div>
    </div>
  
  `*/


async function submitBooking(no_tickets, code, eventId, eventTickets) {
  console.log(no_tickets, code, eventId, eventTickets)

  let booking = {
    event_id: eventId,
    booking_no: code,
    no_tickets: no_tickets

  }

  console.log('booking to be added', booking)

  try {
    const response = await fetch("api/registerBooking", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
    const result = await response.json()
    console.log(result)
    alert('Booking confirmed')
    let newTickets = eventTickets - no_tickets
    adjustTickets(newTickets, eventId)

  } catch (error) {
    console.error('Error during fetch:', error)
    alert('Failed to submit booking', error)
  }

}
async function adjustTickets(newTickets, eventId) {
  console.log(newTickets, eventId)

  /* tror man ist f att göra eventId till ett tal måste göra newTickets till en sträng, ej ett värde eller nåt, (medn det är kanske ddet som själva put-en gör i registerBooking)
  jämför med fetchen i Bookstorekoden, ddär sätter  han in  {name: bookName}
  
  om man ändå ska parseInt eventId så funkar det om man gör det innan try:en och inte inuti
  testa:
  async function adjustTickets(newTickets, event) {
    console.log(newTickets, event)
   let eventId=parseInt(event)
   console.log (newTickets, eventId)
  övre blir '2', undre 2 utan.
  
  nu orkar jag inte mer, men nu är det iaf bara ett felmeddellande på PUT:en resten funkar 
  fast den skriver tickeds updated fast ticketUpdated=false
  */

  try {
    const response = await fetch(`api/registerBooking/${eventId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickets: newTickets })
    })
    const result = await response.json()
    console.log(result)
    console.log('Tickets updated')
  } catch (error) {
    console.error('Error during fetch:', error)
    console.log('Failed to update tickets', error)
  }

}

window.submitBooking = submitBooking
window.adjustTickets = adjustTickets