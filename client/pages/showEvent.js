import event from "./eventList.js"

export default async function (eventId) {
  console.log(eventId)
  const event = await getEventData(eventId)

  let html = `

    <div>
      <h1>${event.headline}</h1>
      <p>${event.description_long}</p>
    </div>
  
  `



  

  return html

}

async function getEventData(eventId) {
  let response = await fetch(`/api/getEventData/${eventId}`)
  let result = await response.json();
  console.log(result)
  return result
}





