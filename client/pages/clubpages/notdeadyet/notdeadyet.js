import showEvent from "../../showEvent.js"
export default async function () {
  const clubName = { clubname: 'Not Dead Yet' }
  const clubdata = await getClubData(clubName)
  const clubEvents = await getClubEvents()
  console.log(clubdata, clubEvents)

  // build your club page here
  let html = `
  <link rel="stylesheet" href="./styles/NDY.css">
  <div class="block">
  <h1>${clubdata.club.name}</h1>
  <div class="NDYdescr">${clubdata.club.description}</div>
  <h2>Club Manifesto</h2>
  <div class="NDYmani">${clubdata.club.manifesto}</div>
  <h3>Upcoming events</h3>
  ${createEventList(clubEvents)}
  `
    +

    `
  </div>
  <div class="image">
  <img src="pages/clubpages/notdeadyet/images/perform2.jpg">
  <img src="pages/clubpages/notdeadyet/images/perform3.jpg">
  <img src="pages/clubpages/notdeadyet/images/perform1.jpg">
  </div>
  `

  return html

}

async function getClubData(clubName) {
  let response = await fetch('/api/getclub', {
    method: 'post',
    // and that we will send data json formatted
    headers: { 'Content-Type': 'application/json' },
    // the data encoded as json
    body: JSON.stringify(clubName)
  })
  let result = await response.json();
  console.log(result)
  return result
}

async function getClubEvents() {
  const response = await fetch("api/getNotDeadYetEvents")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(clubEvents) {
  console.log(clubEvents)
  let events = ""

  let index = 1
  for (let event of clubEvents) {

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
        
        <div class="eventItemDate">
          <div class="eventItemDay">${date}</div>
          <div class="eventItemMonth">${getMonthName(month)}</div>
          <div class="eventItemYear">${year}</div>
        </div>
      </div>

      <div class="eventItemMiddle">
        
        <h3>${event.headline}</h3>
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
    <div class="NDYevents">${events}</div>
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

