export default async function () {
  const galaAbout = await getAbout();
  console.log(galaAbout)

  return `
  <h1>Gala Emporium</h1>
  ${getAbout(galaAbout[0].manifesto)}
  `
}

async function getAbout() {
  const response = await fetch("api/gala")
  const data = await response.json()
  return data
}