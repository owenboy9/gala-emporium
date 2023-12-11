export default async function (clubId) {
  let event
  let html = `
    <div>
      <h1>Add new event</h1>
      <h2>Please fill out event information</h2>

      <div class="editor">
      <h3>Edit your event</h3>

      <form class="eventEditForm" id="formHeadline${clubId}" onsubmit="submitAdd(); return false">
        <input type="hidden" name="club_id" value="${clubId}">
        <p>Event headline</p>
        <input class="eventEditInputBox" name="headline" value="">
        <p>Event description, short</p>
        <input class="eventEditInputBox" name="description_short" value="">
        <p>Event description, long</p>
        <input class="eventEditInputBox" name="description_long" value="">
        <p>Ticket price</p>
        <input class="eventEditInputBox" name="ticket_price" value="">
        <p>Number of tickets</p>
        <input class="eventEditInputBox" name="tickets" value="">
        <p>Start time</p>
        <input class="eventEditInputBox" name="start_time" value="">
        <p>End time</p>
        <input class="eventEditInputBox" name="end_time" value="">
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

async function submitAdd () {
  console.log('preparing update')
  console.log($('[name=ticket_price]').val())
  let starttimeForm = $('[name=start_time]').val()
  let sqlStarttime = convertToSQLDatetime(starttimeForm)
  let endtimeForm = $('[name=end_time]').val()
  let sqlEndtime = convertToSQLDatetime(endtimeForm)
  let event = {
    club_id: $('[name=club_id]').val(),
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
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
      const result = await response.json()
      console.log(result)
      alert('Event added')
    } catch (error) {
      console.error('Error during fetch:', error)
      alert('Failed to add event', error)
    }

}

window.submitChange = submitChange

function convertToSQLDatetime(jsDateString) {
  const jsDate = new Date(jsDateString)
  const sqlDatetime = jsDate.toISOString().slice(0, 19).replace('T', ' ')
  console.log(sqlDatetime)
  return sqlDatetime;
}
