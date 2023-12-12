import event from "./eventList.js"

export default async function (eventId) {
  console.log(eventId)
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
        let email=prompt("Your tickets are reserved. "+code+" is your booking number. Please present it at the Gala Emporium entrance. We accept Mastercard and Visa cars, Swish and cash in SEK. Enjoy your show! If you want your reservation details sent to you please enter your e-mail here:") ;
       
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