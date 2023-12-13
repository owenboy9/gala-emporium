export default async function () {
  const clubName = {clubname: 'The Parrot Prattle Cracker'}
  const clubdata = await getClubData(clubName)
  const clubEvents = await getClubEvents()
  console.log(clubdata, clubEvents)

  // build your club page here
  let html = `
  <link rel="stylesheet" href="./styles/parrotstyles.css">
  <div id="parrotLeft" class="block">
    <section id="leftBody">
      <div id="headline">
        <img class="headlineImage" src="pages/clubpages/parrotprattlecracker/media/headline.png">
        <img class="headlineImage" src="pages/clubpages/parrotprattlecracker/media/parrot.jpeg">
      </div>
    </section>

  <p class="parrotShout">The only club where talking birds can gather to debate, mate and iterate.</p>
 
  <h2>Upcoming events</h2>
  ${createEventList(clubEvents)}
  `
  +

  `
  </div>
  <div id="parrotRight">
    
    <div class="manifesto">
      <img class="parrotImageFull" src="pages/clubpages/parrotprattlecracker/media/pipe.jpeg">

      <h2>Club Manifesto</h2>
      ${clubdata.club.manifesto}
    </div>

  
  
  
  
  
  
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
  const response = await fetch("api/getParrotEvents")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(clubEvents) {
  let events = ""
    let index = 1
  let colorClasses = ['color1', 'color2', 'color3']  
  for (let event of clubEvents) {

    let backgroundColor = colorClasses[Math.floor(Math.random() * colorClasses.length)]

    let jsstarttime = new Date(event.start_time)
    let weekday = jsstarttime.getDay()
    let date = jsstarttime.getDate()
    let month = jsstarttime.getMonth()
    let year = jsstarttime.getFullYear()
    let startHour = padZero(jsstarttime.getUTCHours())
    let startMinute = padZero(jsstarttime.getUTCMinutes())



    events += `
    <section class="parrotEventItem ${backgroundColor}">
      
    <div class="parrotEventLeft">
        
        <div class="parrotEventDate">
          <div class="parrotEventDateText">${getDayName(weekday)}</div>
          <div class="eventItemDay">${date}</div>
          <div class="parrotEventDateText">${getMonthName(month)}</div>
          <div class="eventItemYear">${year}</div>
        </div>
        
      </div>

      <div class="parrotEventMiddle">
        <h2>${event.headline}</h2>
        <span class="eventItemTime">${startHour}</span>:<span class="eventItemTime">${startMinute}</span>
        <p>${event.description_long}</p>
        <div class="eventItemButton eventItemReadMore" onclick="openEventPage(${event.id})">Read more</div>
      </div>
      
      <div class="parrotEventRight">
        <div class="eventItemButton">TICKETS</div>
        <div class="eventItemTickets">${event.tickets} tickets available</div>
        <div class="eventItemPrice">
          <p>${event.ticket_price} kr</p>
        </div>
      </div>
    
    </section>
    `
    index++
  }
  return `
    <div>${events}</div>
  `
  }


  function padZero(value) {
    return value < 10 ? `0${value}` : `${value}`
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