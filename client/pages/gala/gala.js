export default async function () {
  const galaAbout = await getAbout();
  console.log(galaAbout)

  const aboutData = galaAbout.length > 0 ? galaAbout[0] : {};

  return `
  <link rel="stylesheet" href="./styles/gala.css">
    <h1>Gala Emporium</h1>
    <div class="GE-info">
      <p>${aboutData.about_us || 'Not available'}</p>
      <p>${aboutData.manifesto || 'Not available'}</p>

    </div>

    <div class="image">
    <img src="pages/gala/media/mainstage.jpeg">
  <img src="pages/gala/media/fancyBar.jpeg">
  <img src="pages/gala/media/redinterior.jpeg">
  <img src="pages/gala/media/bar.jpeg">
  </div>
  `;
}

async function getAbout() {
  const response = await fetch("api/gala")
  const data = await response.json()
  return data
}