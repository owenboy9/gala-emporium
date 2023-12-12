export default async function (eventId) {
  let event = await getEvent(eventId)
  console.log(event.start_time)
  let startYear = new Date(event.start_time).getFullYear()
  let startMonth = new Date(event.start_time).getMonth()
  let startDay = new Date(event.start_time).getDate()
  let startHour = new Date(event.start_time).getHours()
  let startMinute = new Date(event.start_time).getMinutes()
  let startSeconds = new Date(event.start_time).getSeconds()

  let endYear = new Date(event.end_time).getFullYear()
  let endMonth = new Date(event.end_time).getMonth()
  let endDay = new Date(event.end_time).getDate()
  let endHour = new Date(event.end_time).getHours()
  let endMinute = new Date(event.end_time).getMinutes()
  let endSeconds = new Date(event.end_time).getSeconds()

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
        <div class="eventEditTimeContainer">
          <input class="eventEditInputBox" name="start_year" value="${startYear}">
          -
          <input class="eventEditInputBox" name="start_month" value="${startMonth}">
          -
          <input class="eventEditInputBox" name="start_day" value="${startDay}">
          &nbsp;
          <input class="eventEditInputBox" name="start_hour" value="${startHour}">
          :
          <input class="eventEditInputBox" name="start_minute" value="${startMinute}">
          :
          <input class="eventEditInputBox" name="start_seconds" value="${startSeconds}">
        </div>  
        <p>End time</p>
        <div class="eventEditTimeContainer">
          <input class="eventEditInputBox" name="end_year" value="${endYear}">
          -
          <input class="eventEditInputBox" name="end_month" value="${endMonth}">
          -
          <input class="eventEditInputBox" name="end_day" value="${endDay}">
          &nbsp;
          <input class="eventEditInputBox" name="end_hour" value="${endHour}">
          :
          <input class="eventEditInputBox" name="end_minute" value="${endMinute}">
          :
          <input class="eventEditInputBox" name="end_seconds" value="${endSeconds}">
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

async function submitChange (eventId) {
  console.log('preparing update')
  console.log($('[name=ticket_price]').val())

  let sqlStarttime = $('[name=start_year]').val() + '-' + $('[name=start_month]').val() + '-' + $('[name=start_day]').val() + ' ' + $('[name=start_hour]').val() + ':' + $('[name=start_minute]').val() + ':' + $('[name=start_seconds]').val()
  let sqlEndtime = $('[name=end_year]').val() + '-' + $('[name=end_month]').val() + '-' + $('[name=end_day]').val() + ' ' + $('[name=end_hour]').val() + ':' + $('[name=end_minute]').val() + ':' + $('[name=end_seconds]').val()

  let starttimeForm = new Date($('[name=start_time]').val())
 // let sqlStarttime = convertToSQLDatetime(starttimeForm)
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
