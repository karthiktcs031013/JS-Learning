class Book {
    constructor(title, author,isbn) {
        this.title = title;
        this.author =author;
        this.isbn =isbn;
    }
}

class UI {
    addBookToList(book) {
        const bookList = document.querySelector('#book-list');
        const row = document.createElement('tr');
        console.log(row);
    
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;
    
        bookList.appendChild(row);
    
    }

    clearFields() {
        document.querySelector('#title').value ='';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showAlert(msg,className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
    
        const container = document.querySelector('.container');
        const bookForm = document.querySelector('#book-form');
    
        container.insertBefore(div,bookForm);
    
        setTimeout(function() {
            document.querySelector('.alert').remove();
        },3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

document.querySelector('#book-form').addEventListener('submit',function(e) {
    console.log("Test  ....");
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;
    const book = new Book(title,author,isbn);
    const ui = new UI();
    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill all details','error');
    } else {
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert('Book Added !','success');
    }
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Deleted !','success');
    e.preventDefault();
});