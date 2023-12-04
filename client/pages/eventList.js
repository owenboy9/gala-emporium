export default async function () {
  console.log('eventList.js')
  const eventData = await getEvents();

return `
  <h1>Events</h1>
  ${createEventList(eventData)}
  `
}

async function getEvents() {
  const response = await fetch("api/events")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(eventData) {
  console.log(eventData)
  let events = ""

  let index = 1
  for (let event of eventData) {

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
    <div class=eventItem>
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