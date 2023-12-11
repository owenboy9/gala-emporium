<<<<<<< HEAD
export default async function (userId) {
  let events = await getEventData(userId)
=======
let events

export default async function (userId) {
  events = await getEventData(userId)
>>>>>>> dev
  
  console.log(userId, events)
  let clubname = events[0].clubname
  let html = `
    <div>
      <h1>Event manager</h1>
      <h2>Edit, add or delete your events</h2>
      <p>You are currently logged in as club admin for ${clubname}

<<<<<<< HEAD
      <div>${showEvents(events)}</div
=======
      <div>${showEvents(events)}</div>
>>>>>>> dev

    </div>
  `

  return html
<<<<<<< HEAD




} 
=======
} 
 
>>>>>>> dev

async function getEventData(userId) {
  let response = await fetch(`/api/eventEditor/${userId}`)
  let result = await response.json();
  console.log(result)
  return result
}

function showEvents(events) {
<<<<<<< HEAD
  let html = ''
  for (let event of events) {
    html += `
      <div class="eventInfo">
        <h2>${event.headline}</h2>
        <p>${event.description_short}</p>
      </div>
    `
  }
  return html
}
=======
  let html = ``
  let index = 0
  for (let event of events) {
      
    html += `

     <div class="eventEditWrapper"> 
      <div class="eventEditItem">
        ${fixTime(event)}
        <h2>${event.headline}</h2>
      </div>
      <div class="eventEditButtons">
        <button class="eventEditButton" onclick="openEventToEdit(${index})">Edit</button>
      </div>
     </div> 

     <section id="event${event.id}"></section>

    `
    index++
  }
  return html
}

function fixTime(event) {
  let html = ``
  let jsstarttime = new Date(event.start_time)
  let weekday = jsstarttime.getUTCDay()
  let date = jsstarttime.getUTCDate()
  let month = jsstarttime.getUTCMonth()
  let year = jsstarttime.getUTCFullYear()
  let startHour = padZero(jsstarttime.getUTCHours())
  let startMinute = padZero(jsstarttime.getUTCMinutes())

  html += `
    <div class="eventEditDate">
      <div class="eventEditYear">${getDayName(weekday)}</div>
      <div class="eventEditDay">${date}</div>
      <div class="eventEditMonth">${getMonthName(month)}</div>
      <div class="eventEditYear">${year}</div>
    </div>
  `
  return html

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

///// edit event

function openEventToEdit(index) {
  
  console.log(index)
  let event = events[index]
  console.log(event)
  console.log(event.id)
  console.log('open event to edit', event.id)
  let html = ` 
    <p>This is a test</p>
  
  `
  let elementId = `#event${event.id}`
  console.log(elementId)
  $(elementId).html(html)

 /*  try {
    const event = JSON.parse(eventObject);
    console.log(event);
    console.log('open event to edit', event.id);
    let html = `<p>This is a test</p>`;
    let elementId = `#event${event.id}`;
    $(elementId).html(html);
  } catch (error) {
    console.error('Error parsing eventObject:', error);
  } */


}

window.openEventToEdit = openEventToEdit
>>>>>>> dev
