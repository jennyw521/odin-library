const showDialogBtn = document.querySelector("#showDialog");
const closeDialogBtn = document.querySelector("#closeBtn");
const addBookBtn = document.querySelector("#addBookBtn")
const dialog = document.querySelector("#dialog");
const form = document.querySelector("form");
const display = document.querySelector(".displayContainer");

const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    if (!title || !author || !pages) {
        return;
    }
    let status = document.querySelector("#status").checked? "Read Already" : "Not Read Yet";
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    displayLibrary();
}

function findBook(book) {
    const index = myLibrary.findIndex(item => item.title === book);
    return index;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function changeStatus(index, currentStatus) {    
    myLibrary[index].status = currentStatus === "Read Already"
    ? "Not Read Yet" 
    : "Read Already";

    displayLibrary();
}

function displayLibrary() {
    display.innerHTML = "";
    
    myLibrary.forEach(book => {
        display.innerHTML +=   `
            <div class="book">
                <p>${book.title}</p>
                <p>By ${book.author}</p>
                <p>${book.pages} Pages</p>
                <div id="${book.title}">
                    <button type="button" class="${book.status}">${book.status}</button>
                    <button type="button" class="removeBookBtn">Remove Book</button>
                </div>
            </div>
        `
    });
}

showDialogBtn.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})

addBookBtn.addEventListener("click", () => {
    addBookToLibrary();
})

display.addEventListener("click", (e) => {
    const targetDiv = e.target.className;
    const index = findBook(e.target.parentElement.id);
    const currentStatus = e.target.textContent;

    if (targetDiv === "removeBookBtn") {
        removeBook(index);
    } else if (targetDiv === "Read Already" || targetDiv === "Not Read Yet") {
        changeStatus(index, currentStatus);
    }
})

// Adding default books to the library
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read Already");
const book2 = new Book("The Little Prince", "Antoine de Saint-Exupéry", 109, "Read Already");
const book3 = new Book("Eloquent JavaScript", "Marijn Haverbeke", 227, "Not Read Yet");
myLibrary.push(book1, book2, book3);
displayLibrary();



