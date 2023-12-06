export default async function () {

  const clubData = await getClubs();

  return `
  <h1>Clubs</h1>
  ${createClubList(clubData)}
  `
}

async function getClubs() {
  const response = await fetch("api/clubs")
  const data = await response.json()
  return data
}

function createClubList(clubData) {

  let clubs = ""

  let index = 1
  for (let club of clubData) {
    // document.getElementById('eventlist').innerHTML = user.username
    clubs += `

    <div class=club>
    <div class="clubName">
    <h2>${club.name}</h2>
    </div>
    <div class="clubInfo">
    <h3>${club.manifesto}</h3>
    <p>${club.description}</p>
    </div>
    </div>
    `
    index++
  }

  return `
    <div>${clubs}</div>
  `

} 