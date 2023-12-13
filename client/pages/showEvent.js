import eventList from "./eventList.js"
import event from "./eventList.js"

export default async function (eventId) {
  console.log(eventId)
  const event = await getEventData(eventId)
  /*const club = await getClubs(event.club_id)*/

  let jsstarttime = new Date(event.start_time)

  let day = jsstarttime.getDay()
  let date = jsstarttime.getDate()
  let month = jsstarttime.getMonth()
  let year = jsstarttime.getFullYear()

  function padZero(value) {
    return value < 10 ? `0${value}` : `${value}`
  }

  let startHour = padZero(jsstarttime.getHours())
  let startMinute = padZero(jsstarttime.getMinutes())


  if (startMinute === '0') {
    startMinute = '00'
  }

  let html = `
<link rel="stylesheet" href="./styles/showEvent.css">
    <div class="showEvent">
            <h1>${event.headline}</h1>
      <div class="eventDescr">
      <h2>${event.description_short}</h2>
      <div class="eventDetails">
       <div class="eventDatum">
      <p class="eventDay">${date} ${getMonthName(month)} ${year} </p>
      <p class="eventTime">${startHour}:${startMinute} </p>
      </div>
      
      <p class="ticketsLeft">${event.tickets} tickets available</p>
      <p class="price">${event.ticket_price} kr</p>

      </div>
      <div class="eventItemButton">TICKETS</div>
  
      <p>${event.description_long}</p>
      
      <div class="closeButton" onclick="openAllEventsPage()">To all events</div>
       
      
      </div>
    </div>
  
  `

  return html

}

async function getEventData(eventId) {
  let response = await fetch(`/api/getIndividualEvents/${eventId}`)
  let result = await response.json();
  console.log(result)
  return result
}

/*async function getClubs(club_id) {
  const response = await fetch(`/api/getclub/${club_id}`)
  const data = await response.json()
  return data
}*/

function getMonthName(month) {
  console.log(month)
  let index = month
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[index]
}

async function openAllEventsPage() {
  $("main").html(await eventList())
}

window.openAllEventsPage = openAllEventsPage

