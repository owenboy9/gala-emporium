import editEvent from "./editEvent.js"
import newEvent from "./newEvent.js"

export default async function eventManager(userId) {
  let events = await getEventData(userId)
  console.log(events)

  let clubname = events[0].clubname
  let club_id = events[0].club_id
  let html = `
    <div>
      <h1>Event manager</h1>
      <h2>Edit, add or delete your events</h2>
      <p>You are currently logged in as club admin for ${clubname}</p>

      <button class="eventEditButton" onclick="openPageToAdd(${club_id})">Add new event</button>

      <div>${showEvents(events)}</div>

    </div>
  `
  return html
}

async function getEventData(userId) {
  let response = await fetch(`/api/eventEditor/${userId}`)
  let result = await response.json();
  console.log(result)
  return result
}

function showEvents(events) {
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
          <button class="eventEditButton" onclick="openEventToEdit(${event.id})">Edit</button>
          <button class="eventEditButton" onclick="deleteEvent(${event.id})">Delete event</button>
        </div>
       </div> 
  
       <section id="event${event.id}"></section>
  
      `
    index++
  }
  return html
}

async function openEventToEdit(eventId) {
  $("main").html(await editEvent(eventId))
}

window.openEventToEdit = openEventToEdit

async function openPageToAdd(clubId) {
  $("main").html(await newEvent(clubId))
}

window.openPageToAdd = openPageToAdd


function fixTime(event) {
  let html = ``
  let jsstarttime = new Date(event.start_time)
  let weekday = jsstarttime.getUTCDay()
  let date = jsstarttime.getDate()
  let month = jsstarttime.getMonth()
  let year = jsstarttime.getFullYear()
  let startHour = padZero(jsstarttime.getHours())
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

async function deleteEvent(eventId) {
  let text = "Delete event?"
  if (confirm(text) == true) {

    const response = await fetch(`api/eventEditor/${eventId}`, {
      method: "delete"
    })
    const result = await response.json()
    console.log("delete event - ", result);

    if (result.message === "Event deleted successfully") {
      alert(result.message)
      $("main").html(await eventManager(await checkLogin()))
    } else {
      alert(result.message)
    }

  } else {
    text = "You canceled!"
  }
}

window.deleteEvent = deleteEvent


async function checkLogin() {
  const response = await fetch('/api/login')
  const result = await response.json()
  console.log(result)
  if (result.loggedIn || result.email) {
    return result.userId
  }
  else {
    console.log('could not get login info')
  }
}

window.checkLogin = checkLogin