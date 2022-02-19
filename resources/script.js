
let array = []; // List of books

const display = document.querySelector(".library");
const btn = document.querySelector('#submit'); // Button to display library
btn.addEventListener("click", exposeFunct);

function exposeFunct() {
    const elements = display.querySelectorAll('div');
    elements.forEach(element => display.removeChild(element));

    array.map(book => {
        const card = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h2');
        const delet = document.createElement('button');

        title.textContent = book.title;
        author.textContent = book.author;

        delet.textContent = "DELETE BOOK";
        delet.classList.add(book.title.replace(/ /g, "."));
        delet.addEventListener('click', (e) => {
            array.splice(array.findIndex(elem => elem.title.replace(/ /g, ".") == e.target.classList.value), 1);
            exposeFunct();
        });


        card.classList.add((book.isRead) ? "read" : "unread");
        card.addEventListener('click', () => {
            book.isRead = !(book.isRead);
            card.classList.toggle("read");
            card.classList.toggle("unread");
        });


        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(delet);

        display.appendChild(card);
    });
}

// Definition of book Object
function Book(title, author, isRead) {
    function capitalize(text) {
        let words = text.trim().split(" ");
        words = words.map(word => word[0].toUpperCase() + word.slice(1));
        return words.join(" ");
    }

    this.title = capitalize(title);
    this.author = capitalize(author);
    this.isRead = isRead;
    this.info = function () {
        return `${this.title} by ${this.author} : ${this.isRead ? "Already read." : "Not read yet!"}`;
    }
}

// Form treatment
const form = document.querySelector('.form');
const newTitle = form.querySelector('#title');
const newAuthor = form.querySelector('#author');
const newIsRead = form.querySelector('#is_read');
const submission = form.querySelector('button');
submission.addEventListener('click', () => {
    if (newTitle.value.length * newAuthor.value.length > 0) {
        array.push(new Book(newTitle.value, newAuthor.value, newIsRead.checked));
        newAuthor.value = newTitle.value = "";
        newIsRead.checked = false;
        exposeFunct();
    }
});

const book1 = new Book("tom sawyer", "mark twain", true);
const book2 = new Book("hamlet", "scheakspear", false);

array.push(book1);
array.push(book2);
exposeFunct();