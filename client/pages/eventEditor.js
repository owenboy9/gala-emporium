export default async function (userId) {
  let events = await getEventData(userId)
  
  console.log(userId, events)
  let clubname = events[0].clubname
  let html = `
    <div>
      <h1>Event manager</h1>
      <h2>Edit, add or delete your events</h2>
      <p>You are currently logged in as club admin for ${clubname}

      <div>${showEvents(events)}</div

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
