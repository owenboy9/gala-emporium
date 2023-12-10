let events

export default async function (userId) {
  events = await getEventData(userId)
  
  console.log(userId, events)
  let clubname = events[0].clubname
  let html = `
    <div>
      <h1>Event manager</h1>
      <h2>Edit, add or delete your events</h2>
      <p>You are currently logged in as club admin for ${clubname}

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
    <div class="editor">
      <h3>Edit your event</h3>

      <form class="eventEditForm" id="formHeadline${event.id}" onsubmit="prepareUpdate(${event.id}); return false">
        <p>Event headline</p>
        <input class="eventEditInputBox" name="headline" placeholder="${event.headline}">
        <p>Event description, short</p>
        <input class="eventEditInputBox" name="description_short" placeholder="${event.description_short}">
        <p>Event description, long</p>
        <input class="eventEditInputBox" name="description_long" placeholder="${event.description_long}">
        <p>Ticket price</p>
        <input class="eventEditInputBox" name="ticket_price" placeholder="${event.ticket_price}">
        <p>Number of tickets</p>
        <input class="eventEditInputBox" name="tickets" placeholder="${event.tickets}">
        <p>Start time</p>
        <input class="eventEditInputBox" name="start_time" placeholder="${event.start_time}">
        <p>End time</p>
        <input class="eventEditInputBox" name="end_time" placeholder="${event.end_time}">
        <input class="eventEditFormButton" type="submit" value="Submit changes">
      </form>  
    
    </div>
  
  `
  let elementId = `#event${event.id}`
  console.log(elementId)
  $(elementId).html(html)

}

window.openEventToEdit = openEventToEdit

async function prepareUpdate(eventId) {
  console.log('preparing update')
  const event = {
    headline: $('[name=headline]').val(),
    description_short: $('[name=description_short]').val(),
    description_long: $('[name=description_long]').val(),
    ticket_price: $('[name=ticket_price]').val(),
    tickets: $('[name=tickets]').val(),
    start_time: $('[name=start_time').val(),
    end_time: $('[name=end_time').val()
  }

    const response = await fetch(`api/eventEditor/${eventId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
    const result = await response.json()
    console.log(result)

    /* if (result.bookUpdated) {
      alert(`${bookName} was updated`)
      $("h1").html(`Edit Page for: ${bookId} - ${bookName}`)
      $("[name=bookName]").html(`${bookName}`)
    } */
  } 


window.prepareUpdate = prepareUpdate