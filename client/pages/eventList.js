import showEvent from "./showEvent.js"

export default async function () {
  console.log('eventList.js')
  const eventData = await getEvents();

  return `
  <div>
  <h1>Events</h1>
  ${createEventList(eventData)}
  </div>
  `
}

async function getEvents() {
  console.log('get events')
  const response = await fetch("api/sorted-events")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(eventData) {
  console.log(eventData)
  let events = ""

  let index = 1
  for (let event of eventData) {

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
    /*  let jsstartdate = jsstarttime.toLocaleDateString()
 
     const sqlDatetimeStart = event.start_time;
     const jsDateObject = new Date(sqlDatetimeStart);
 
     const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
     const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
 
     const startdate = jsDateObject.toLocaleDateString('en-GB', dateOptions);
     const starttime = jsDateObject.toLocaleTimeString('en-GB', timeOptions); */


    // document.getElementById('eventlist').innerHTML = user.username
    events += `


    <section class="eventItem">
      <div class="eventItemLeft">
        <div class="eventItemLogo">
          <img src="${event.logo}">
        </div>
        <div class="eventItemDate">
          <div class="eventItemDay">${date}</div>
          <div class="eventItemMonth">${getMonthName(month)}</div>
          <div class="eventItemYear">${year}</div>
        </div>
      </div>

      <div class="eventItemMiddle">
        <p>${event.club_name} presents</p>
        <h2>${event.headline}</h2>
        <span class="eventItemTime">${startHour}</span>:<span class="eventItemTime">${startMinute}</span>
        <p>${event.description_short}</p>
        <div class="eventItemPrice">
          <p>${event.ticket_price} kr</p>
        </div>
        <div class="eventItemButton eventItemReadMore" onclick="openEventPage(${event.id})">Read more</div>
      </div>
      
      <div class="eventItemRight">
        <div class="eventItemButton">TICKETS</div>
        <div class="eventItemTickets">${event.tickets} tickets available</div>
      </div>
    
    </section>
    `
    index++
  }
  return `
    <div>${events}</div>
  `
}

function getMonthName(month) {
  console.log(month)
  let index = month
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[index]
}

async function openEventPage(eventId) {
  $("main").html(await showEvent(eventId))
}

window.openEventPage = openEventPage