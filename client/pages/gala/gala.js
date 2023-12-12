export default async function () {
  const galaAbout = await getAbout();
  console.log(galaAbout)

  const aboutData = galaAbout.length > 0 ? galaAbout[0] : {};

  return `
  <link rel="stylesheet" href="./styles/gala.css">
    <h1>Gala Emporium</h1>
    <div>
      <p>${aboutData.about_us || 'Not available'}</p>
      <p>${aboutData.manifesto || 'Not available'}</p>
      <!-- Add more HTML elements for other properties -->
    </div>
  `;
}

async function getAbout() {
  const response = await fetch("api/gala")
  const data = await response.json()
  return data
}