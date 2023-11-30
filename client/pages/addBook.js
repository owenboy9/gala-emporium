export default function () {
  return `
  <h1>Add new book!</h1>
  <form onsubmit="addBook(); return false">
    <input type="text" name="bookName" placeholder="Book name">
    <input id="submit" type="submit" value="Add Book">
  </form>
  `
}

async function addBook() {
  const bookName = $("[name=bookName]").val()
  console.log(bookName)

  if (bookName.trim().length > 0) {
    const response = await fetch("api/books", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: bookName })
    })
    const result = await response.json()

    if (result.bookAdded) {
      alert(`${bookName.trim()} was added`)
      $("[name=bookName]").val("")
    }
  } else {
    alert("Du måste skriva något!")
  }
}

window.addBook = addBook