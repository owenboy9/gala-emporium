import eventManager from "../pages/eventManager.js"

export default function init() {
  return `
    <form id="logInOut" onsubmit="login(); return false">
      <input name="email" placeholder="your email">
      <input name="password" placeholder="your password">
      <input type="submit" value="Login">
    </form>  
  `
}

async function login() {
  const credentials = {
    email: $('[name=email]').val(),
    password: $('[name=password]').val()
  }
  console.log(credentials)
  let response = await fetch('/api/login', {
    // tell the server we want to send/create data
    method: 'post',
    // and that we will send data json formatted
    headers: { 'Content-Type': 'application/json' },
    // the data encoded as json
    body: JSON.stringify(credentials)
  });
  let result = await response.json();
  console.log(result)
  if (result.loggedIn) {
    $('#logInOut').html(`
      <button onclick="logout()">Logout</button>
    `)
    $('#adminBar').html(`
      <p>Welcome, ${result.username}</p>
      <button onclick="openEditor(${result.userId})">Manage your events</button>

     `)
    document.getElementById('adminBar').style.backgroundColor = 'red' 
  }
}

window.login = login // expose login to global (html) scope

async function openEditor(userId) {
  $("main").html(await eventManager(userId))
}

window.openEditor = openEditor

async function logout() {
  console.log('sir, logging out?')
  let response = await fetch('/api/login', {
    method: 'delete'
  });
  let result = await response.json();
  console.log(result)
  if (!result.loggedIn) {
    $('#login').html(init())
    $('#adminBar').html("")
    document.getElementById('adminBar').style.backgroundColor = 'transparent'
  }
}

window.logout = logout


async function checkLogin() {
  const response = await fetch('/api/login')
  const result = await response.json()
  console.log(result)
  if (result.loggedIn || result.email) {
    $('#logInOut').html(`
      <button onclick="logout()">Logout</button>
    `)
    $('#adminBar').html(`
      <p>Welcome, ${result.username}</p>
      <button onclick="openEditor(${result.userId})">Manage your events</button>

     `)
    document.getElementById('adminBar').style.backgroundColor = 'red' 
  }
}

checkLogin() // will execute on load