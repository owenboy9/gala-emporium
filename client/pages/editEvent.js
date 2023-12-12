export default async function (eventId) {
  let event = await getEvent(eventId)
  console.log(event)

  let html = `
    <div>
      <h1>Edit event</h1>
      <h2>Update event information</h2>

      <div class="editor">
      <h3>Edit your event</h3>

      <form class="eventEditForm" id="formHeadline${event.id}" onsubmit="submitChange(${event.id}); return false">
        <p>Event headline</p>
        <input class="eventEditInputBox" name="headline" value="${event.headline}">
        <p>Event description, short</p>
        <input class="eventEditInputBox" name="description_short" value="${event.description_short}">
        <p>Event description, long</p>
        <input class="eventEditInputBox" name="description_long" value="${event.description_long}">
        <p>Ticket price</p>
        <input class="eventEditInputBox" name="ticket_price" value="${event.ticket_price}">
        <p>Number of tickets</p>
        <input class="eventEditInputBox" name="tickets" value="${event.tickets}">
        <p>Start time</p>
        <input class="eventEditInputBox" name="start_time" value="${event.start_time}">
        <p>End time</p>
        <input class="eventEditInputBox" name="end_time" value="${event.end_time}">
        <input class="eventEditFormButton" type="submit" value="Submit changes">
      </form>  
    
    </div>

    </div>
  `
  return html
}

async function getEvent(eventId) {
  let response = await fetch(`/api/getEventData/${eventId}`)
  let result = await response.json();
  console.log(result)
  return result
}

async function submitChange (eventId) {
  console.log('preparing update')
  console.log($('[name=ticket_price]').val())
  let starttimeForm = new Date($('[name=start_time]').val())
  let sqlStarttime = convertToSQLDatetime(starttimeForm)
  let endtimeForm = $('[name=end_time]').val()
  let sqlEndtime = convertToSQLDatetime(endtimeForm)
  console.log('sql start time', sqlStarttime)
  let event = {
    headline: $('[name=headline]').val(),
    description_short: $('[name=description_short]').val(),
    description_long: $('[name=description_long]').val(),
    ticket_price: $('[name=ticket_price]').val(),
    tickets: $('[name=tickets]').val(),
    start_time: sqlStarttime,
    end_time: sqlEndtime
  }

    try {
      const response = await fetch(`api/eventEditor/${eventId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
      const result = await response.json()
      console.log(result)
      alert('Event updated')
    } catch (error) {
      console.error('Error during fetch:', error)
      alert('Failed to update event', error)
    }

}

window.submitChange = submitChange

function convertToSQLDatetime(jsDateString) {
  const jsDate = new Date(jsDateString)
  const sqlDatetime = jsDate.toISOString().slice(0, 19).replace('T', ' ')
  console.log(sqlDatetime)
  return sqlDatetime;
}
