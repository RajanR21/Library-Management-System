const addBookBtn = document.getElementById("add");
const searchBtn = document.getElementById("search-btn");
const findByCaragory = document.getElementById("filter-catagory");
const updatebook = document.getElementById("update");
let f = true;

// dialogue part ...............................

let dialog_ind;
const getData = () => {
  let books;
  if (localStorage.getItem("user") == null) books = [];
  else books = JSON.parse(localStorage.getItem("user"));
  return books;
};

const show = function (ind) {
  dialog_ind = ind;
  const dialog = document.querySelectorAll("dialog");
  console.log(dialog[dialog_ind]);
  dialog[dialog_ind].showModal();
};
const closee = function () {
  const dialog = document.querySelectorAll("dialog");
  console.log(dialog[dialog_ind]);
  dialog[dialog_ind].close();
};

// delete Book from storage .............................

const DeleteBook = function (ind) {
  let books = getData();
  if (books.length == 1) {
    books = [];
  } else books.splice(ind, 1);
  console.log(books);
  renderbooks(books);
};

//render Book ...............................................

const renderbooks = function (booksarr) {
  const booksList = document.getElementById("items");
  console.log("ye hai book img ", booksarr);
  if (booksarr.length === 0) {
    booksList.style.display = "none";
    localStorage.setItem("user", JSON.stringify([]));
  } else {
    booksList.style.display = "block";
  }

  booksList.innerHTML = "";
  booksarr.forEach((book, ind) => {
    const bookobj = document.createElement("ul");
    const deletebtn = document.createElement("button");
    const updatebtn = document.createElement("button");
    const dialogue = document.createElement("dialog");
    const showBtn = document.createElement("button");
    const closeBtn = document.createElement("button");

    dialogue.classList.add("dialog");
    deletebtn.textContent = "Remove";
    updatebtn.textContent = "Update";
    deletebtn.setAttribute("onclick", `DeleteBook(${ind})`);
    updatebtn.setAttribute("onclick", `UpdateBook(${ind})`);

    bookobj.classList.add("visible");
    bookobj.classList.add("card");

    let imgurl = document.createElement("img"),
      Name = document.createElement("li"),
      Publication = document.createElement("li"),
      Catagory = document.createElement("li"),
      Author = document.createElement("li");

    Name.textContent = ` Name : ${book.Name}`;
    imgurl.src = book.imgurl;
    Publication.textContent = ` Publication : ${book.Publication}`;
    Catagory.textContent = ` Catagory : ${book.Catagory}`;
    Author.textContent = ` Author : ${book.Author}`;
    updatebtn.style.marginLeft = "1rem";
    deletebtn.style.marginLeft = "1rem";

    showBtn.classList.add("dialogue-show");
    showBtn.setAttribute("onclick", `show(${ind})`);
    closeBtn.setAttribute("onclick", `closee()`);
    closeBtn.classList.add("dialogue-close");

    closeBtn.textContent = "Close";
    showBtn.textContent = "View";
    //closeBtn.setAttribute("autofocus");
    let cloneimg = imgurl.cloneNode(true);
    let cloneName = Name.cloneNode(true);
    dialogue.append(cloneimg);
    dialogue.append(cloneName);
    dialogue.append(Publication);
    dialogue.append(Catagory);
    dialogue.append(Author);
    dialogue.append(closeBtn);

    bookobj.append(imgurl);
    bookobj.append(Name);
    bookobj.append(dialogue);
    bookobj.append(showBtn);
    bookobj.append(deletebtn);
    bookobj.append(updatebtn);
    booksList.append(bookobj);
  });
  if (f == true) localStorage.setItem("user", JSON.stringify(booksarr));
};

document.addEventListener("load", renderbooks(getData()));

let indx;

// add to update button change with updated details..................................

updatebook.addEventListener("click", () => {
  console.log("update horiya");
  console.log("rupali k andar : ", indx);
  const imgurl = document.getElementById("imgurl").value;
  const Name = document.getElementById("name").value;
  const Publication = document.getElementById("publication").value;
  const Catagory = document.getElementById("catagory").value.split(",");
  const Author = document.getElementById("author").value;

  if (
    imgurl.trim() === "" ||
    Publication.trim() === "" ||
    Name.trim() === "" ||
    Catagory === "" ||
    Author.trim() === ""
  ) {
    alert("Please Enter Valid Details");
    return;
  }

  let books = getData();
  console.log(books);
  books[indx].imgurl = imgurl;
  books[indx].Name = Name;
  books[indx].Publication = Publication;
  books[indx].Catagory = Catagory;
  books[indx].Author = Author;

  addBookBtn.style.display = "block";
  updatebook.style.display = "none";
  renderbooks(books);

  document.getElementById("imgurl").value = "";
  document.getElementById("name").value = "";
  document.getElementById("publication").value = "";
  document.getElementById("catagory").value = "";
  document.getElementById("author").value = "";
});

//update Book..........................

const UpdateBook = function (ind) {
  indx = ind;
  addBookBtn.style.display = "none";
  updatebook.style.display = "block";
  let books = getData();

  document.getElementById("imgurl").value = books[indx].imgurl;
  document.getElementById("name").value = books[indx].Name;
  document.getElementById("publication").value = books[indx].Publication;
  document.getElementById("catagory").value = books[indx].Catagory;
  document.getElementById("author").value = books[indx].Author;

  document.getElementById("imgurl").focus();
  console.log("rupali k bahar : ", ind);
};

// add Booke.............................

const addBookHandler = function () {
  const imgurl = document.getElementById("imgurl").value;
  const Name = document.getElementById("name").value;
  const Publication = document.getElementById("publication").value;
  const Catagory = document.getElementById("catagory").value.split(",");
  const Author = document.getElementById("author").value;

  if (
    imgurl.trim() === "" ||
    Publication.trim() === "" ||
    Name.trim() === "" ||
    Catagory === "" ||
    Author.trim() === ""
  ) {
    alert("Please Enter Valid Details");
    return;
  }

  const newBook = {
    imgurl,
    Name,
    Publication,
    Catagory,
    Author,
    id: Math.floor(Math.random() * 1e10),
  };

  let books = getData();
  books.push(newBook);
  renderbooks(books);

  document.getElementById("imgurl").value = "";
  document.getElementById("name").value = "";
  document.getElementById("publication").value = "";
  document.getElementById("catagory").value = "";
  document.getElementById("author").value = "";
};

// filter Book by catagory........................................

addBookBtn.addEventListener("click", addBookHandler);

const filterBookHandler = function () {
  const Catagory = findByCaragory.value;
  let books = getData();
  let newarr = [];
  books.map((book) => {
    if (book.Catagory.includes(Catagory)) newarr.push(book);
  });
  f = false;
  renderbooks(newarr);
  f = true;
};

searchBtn.addEventListener("click", filterBookHandler);
