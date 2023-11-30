import editBook from "./editBook.js";

export default async function () {
  const booksData = await getBooks();

  return `
  <h1>Booklist</h1>
  ${createBooksTable(booksData)}
  `;
}

async function getBooks() {
  const response = await fetch("api/books")
  const data = await response.json()
  return data;
}

function createBooksTable(booklist) {
  let books = ""

  let index = 1;
  for (let book of booklist) {
    books += `
    <tr>
      <td>${index}</td>
      <td onclick="openEditPage(${book.id})">${book.name}</td>
    </tr>
    `
    index++;
  }

  return `
  <table>
  <thead>
    <tr>
      <th>Nr. </th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    ${books}
  </tbody>
</table>

  `




}

async function openEditPage(bookId) {
  $("main").html(await editBook(bookId))
}

window.openEditPage = openEditPage