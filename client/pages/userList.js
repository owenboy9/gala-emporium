export default async function () {
  console.log('userList.js')
  const userData = await getUsers();

return `
  <h1>Clubs</h1>
  ${createEventList(userData)}
  `
}

async function getUsers() {
  const response = await fetch("api/users")
  const data = await response.json()
  console.log(data)
  return data
}

function createEventList(userData) {
  console.log(userData)
  let users = ""

  let index = 1
  for (let user of userData) {
   // document.getElementById('eventlist').innerHTML = user.username
    users += `
    <div>${index}</div>
    <div>${user.user_name}</div>
    <div>${user.email}</div>
    `
    index++
  }
  console.log(users)
  return `
    <div>${users}</div>
  `

 


} 