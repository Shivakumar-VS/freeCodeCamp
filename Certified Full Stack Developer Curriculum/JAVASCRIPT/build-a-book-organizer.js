// ** start of script.js **

function sortByYear(book1, book2) {
  if (book1.releaseYear < book2.releaseYear) {
    return -1;
  } else if (book1.releaseYear > book2.releaseYear) {
    return 1;
  } else {
    return 0;
  }
}

const books = [
  {
    title: "The Alchemist",
    authorName: "Paulo Coelho",
    releaseYear: 1988
  },
  {
    title: "Pride and Prejudice",
    authorName: "Jane Austen",
    releaseYear: 1813
  },
  {
    title: "Clean Code",
    authorName: "Robert C. Martin",
    releaseYear: 2008
  }
];

const filteredBooks = books.filter(book => book.releaseYear > 1950);

filteredBooks.sort(sortByYear);


// ** end of script.js **

