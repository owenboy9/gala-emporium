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
      </div
    </section>

  
 
  <h2>Upcoming events</h2>
  ${createEventList(clubEvents)}
  `
  +

  `
  </div>
  <div id="parrotRight">
    
    <div class="manifesto">
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
  for (let event of clubEvents) {

    let sqlstarttime = event.start_time;
    let jsstarttime = new Date(sqlstarttime)
    let jsstartdate = jsstarttime.toLocaleDateString()

    const sqlDatetimeStart = event.start_time;
    const jsDateObject = new Date(sqlDatetimeStart);

    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const startdate = jsDateObject.toLocaleDateString('en-GB', dateOptions);
    const starttime = jsDateObject.toLocaleTimeString('en-GB', timeOptions);


   // document.getElementById('eventlist').innerHTML = user.username
    events += `
    <div class="eventItem">
    <div class="eventDate">
    <div>${startdate}</div>
    <div>${starttime}</div>
    </div>
    <div class="eventInfo">
    <h2>${event.headline}</h2>
    <p>${event.description_short}</p>
    </div>
    </div>
    `
    index++
  }
  return `
    <div>${events}</div>
  `
  }
