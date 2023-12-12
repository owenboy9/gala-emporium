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
        <div class="eventEditTimeContainer">
          <input class="eventEditInputBox" name="start_year" value="">
          -
          <input class="eventEditInputBox" name="start_month" value="">
          -
          <input class="eventEditInputBox" name="start_day" value="">
          &nbsp;
          <input class="eventEditInputBox" name="start_hour" value="">
          :
          <input class="eventEditInputBox" name="start_minute" value="">
          :
          <input class="eventEditInputBox" name="start_seconds" value="">
        </div>  
        <p>End time</p>
        <div class="eventEditTimeContainer">
          <input class="eventEditInputBox" name="end_year" value="">
          -
          <input class="eventEditInputBox" name="end_month" value="">
          -
          <input class="eventEditInputBox" name="end_day" value="">
          &nbsp;
          <input class="eventEditInputBox" name="end_hour" value="">
          :
          <input class="eventEditInputBox" name="end_minute" value="">
          :
          <input class="eventEditInputBox" name="end_seconds" value="">
        </div>  
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

  let sqlStarttime = $('[name=start_year]').val() + '-' + $('[name=start_month]').val() + '-' + $('[name=start_day]').val() + ' ' + $('[name=start_hour]').val() + ':' + $('[name=start_minute]').val() + ':' + $('[name=start_seconds]').val()
  let sqlEndtime = $('[name=end_year]').val() + '-' + $('[name=end_month]').val() + '-' + $('[name=end_day]').val() + ' ' + $('[name=end_hour]').val() + ':' + $('[name=end_minute]').val() + ':' + $('[name=end_seconds]').val()

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

  console.log('event to be added', event)

    try {
      const response = await fetch("api/eventEditor", {
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

window.submitAdd = submitAdd

function convertToSQLDatetime(jsDateString) {
  const jsDate = new Date(jsDateString)
  const sqlDatetime = jsDate.toISOString().slice(0, 19).replace('T', ' ')
  console.log(sqlDatetime)
  return sqlDatetime;
}

window.convertToSQLDatetime = convertToSQLDatetime