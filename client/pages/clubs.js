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
    <div class="club">
    <div class="clubName">
    <a href="#${club.case}"><h2>${club.name}</h2></a>
    </div>
    <div class="clubInfo">
    <p>${club.description}</p>
    <h3>${club.manifesto}</h3>
    
    <a href="#${club.case}"><p>More club info and all events</p></a>
    </div>
     </div>
    `
    index++
  }

  return `
  <link rel="stylesheet" href="./styles/clubs.css">
    <div class=rutor>${clubs}</div>
  `

}

