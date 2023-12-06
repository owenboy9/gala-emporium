export default async function () {
  const galaAbout = await getAbout();

  return `
  <h1>Gala Emporium</h1>
  ${getAbout(galaAbout)}
  `
}

async function getAbout() {
  const response = await fetch("api/gala")
  const data = await response.json()
  return data
}