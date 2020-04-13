'use strict'

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    toggleReadStatus() {
        if (this.readStatus === false) {
            this.readStatus = true;
            return;
        }

        if (this.readStatus === true) {
            this.readStatus = false;
            return;
        }
    }
}

const ls = {
    setStorage(books) {
        localStorage.setItem('library', JSON.stringify(books));
    },
    getStorage() {
        const library = [];
        const books = JSON.parse(localStorage.getItem('library'));

        books.forEach(book => {
            library.push(new Book(
                book.title,
                book.author,
                book.pages,
                book.readStatus,
            ));
        });

        return library;
    },
    addBook(book) {
        const books = ls.getStorage() || [];
        books.push(book);
        ls.setStorage(books);
    },
    removeBook(index) {
        const books = ls.getStorage() || [];
        books.splice(index, 1);
        ls.setStorage(books);
    },
    toggleReadStatus(index) {
        const books = ls.getStorage() || [];
        const book = books[index];
        book.toggleReadStatus();
        ls.setStorage(books);
    }
}

const view = {
    addBook() {
        const title = document.getElementById('bookTitle');
        const author = document.getElementById('bookAuthor');
        const pages = document.getElementById('bookPages');
        const readStatus = document.getElementById('readStatus');

        const book = new Book(
            title.value, 
            author.value, 
            pages.value, 
            readStatus.checked
        );

        ls.addBook(book);
        this.clearInputs();
    },
    removeBook(index) {
        ls.removeBook(index);
        this.displayBooks();
    },
    toggleReadStatus(index) {
        ls.toggleReadStatus(index);
        this.displayBooks();
    },
    displayBooks() {
        const books = ls.getStorage() || [];
        const bookList = document.getElementById('bookList');

        bookList.innerHTML = '';
        
        books.forEach(book => {
            const tr = document.createElement('tr');

            const title = createTd(book.title);
            const author = createTd(book.author);
            const pages = createTd(book.pages);
            const readStatus = createTd(book.readStatus);
            const deleteBtn = createTd('<i class="delete-btn material-icons">delete</i>');

            tr.appendChild(title);
            tr.appendChild(author);
            tr.appendChild(pages);
            tr.appendChild(readStatus);
            tr.appendChild(deleteBtn);

            bookList.appendChild(tr);
        });
        

        function createTd(html) {
            const td = document.createElement('td');

            if (html === true) {
                td.innerHTML = '<i class="material-icons">done</i>';
            } else if (html === false) {
                td.innerHTML = '<i class="material-icons md-inactive">done</i>';
            } else {
                td.innerHTML = html;  
            }

            return td;
        }
    },
    clearInputs() {
        title.value = '';
        author.value = '';
        pages.value = '';
        readStatus.checked = false;
    }
}

const submitBtn = document.getElementById('submitBookBtn');
submitBtn.addEventListener('click', e => {
    view.addBook();
    view.displayBooks();
    e.preventDefault();
});

document.addEventListener('click', e => {
    if (e.target.innerHTML === 'done') {
        const index = e.target.parentElement.parentElement.rowIndex - 1;
        view.toggleReadStatus(index);
    }
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.parentElement.parentElement.rowIndex - 1;
        view.removeBook(index);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);
    view.displayBooks();
});

