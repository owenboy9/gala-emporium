import showEvent from "./showEvent.js"

const today = new Date();

const aMonthFromNow = new Date(today);
aMonthFromNow.setMonth(today.getMonth() + 1);

const todayFormatted = formatDate(today);
const aMonthFromNowFormatted = formatDate(aMonthFromNow);

console.log("Today:", todayFormatted);
console.log("A month from now:", aMonthFromNowFormatted);

function formatDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}



export default async function () {
  console.log('eventList.js')
  const eventData = await getEvents()


  const sortedEventData = eventData.sort((a, b) => {
    const dateA = new Date(a.start_time)
    const dateB = new Date(b.start_time)
    return dateA - dateB
  })

  const today = new Date()
  const aMonthFromNow = new Date(today)
  aMonthFromNow.setMonth(today.getMonth() + 1)

  const filteredEvents = sortedEventData.filter(event => new Date(event.start_time) <= aMonthFromNow)
  const eventsNotWithinMonth = eventData.filter(event => new Date(event.start_time) > aMonthFromNow);

  return `
  <link rel="stylesheet" href="./styles/allEvents.css">
  <div class="allEvents">
  <h1>Events</h1>
  <h2 class="calendar">This month's events</h2>
  ${createEventList(filteredEvents)}
  <h2 class="calendar">In the future</h2>
  ${createEventList(eventsNotWithinMonth)}
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

    let weekday = jsstarttime.getDay()
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
          <div class="eventItemYear">${getDayName(weekday)}</div>
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
  
    <div class="eventsWrapper">${events}</div>
  `
}

function getMonthName(month) {
  console.log(month)
  let index = month
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[index]
}

function getDayName(weekday) {
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days[weekday]
}


async function openEventPage(eventId) {
  $("main").html(await showEvent(eventId))
}



window.openEventPage = openEventPage