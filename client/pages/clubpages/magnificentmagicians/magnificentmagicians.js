export default async function () {
  const clubName = { clubname: 'Magnificent Magicians' }
  const clubdata = await getClubData(clubName)
  const clubEvents = await getClubEvents()
  console.log(clubdata, clubEvents)

  // build your club page here
  let html = `
  <link rel="stylesheet" href="./styles/magicians.css">
  <div class=image><img src="pages/clubpages/magnificentmagicians/media/logo.mm.png"></div>
  <div class="block">
  <h1 class=magicians>- Magnificent Magicians -</h1>
  <h1 class=magicians>- Info -</h1>
  <h1>${clubdata.club.name}</h1>
  <h2>Club Manifesto</h2>
  <div>${clubdata.club.manifesto}</div>
  <h2>Upcoming events</h2>
  ${createEventList(clubEvents)}
  <h1 class=magicians>-</h1>
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
  const response = await fetch("api/getMagiciansEvents")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(clubEvents) {
  let events = ""

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
  }
  return `
    <div>${events}</div>
  `
}
