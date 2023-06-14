let myLibrary = [];

class Book{
    constructor(author, title, numberOfPages, read){
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.read = read;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

//Is used inside the bookform listener as well as the showForm();
const form = document.getElementById('book-form');

function showForm(){

   form.style.display = 'block';
   
}

const button = document.getElementById('addBookButton');
button.addEventListener('click', showForm);

const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const authorInput = document.querySelector('#author');
    const titleInput = document.querySelector('#title');
    const numberOfPagesInput = document.querySelector('#numberOfPages');
    const readInput = document.querySelector('#read');

    const book = new Book(
        authorInput.value,
        titleInput.value,
        numberOfPagesInput.value,
        readInput.checked
        );

    addBookToLibrary(book);

    bookForm.reset();

    updateBookDisplay();

    form.style.display = 'none';

});

function updateBookDisplay(){
    const parentDiv = document.querySelector('.card-container');
    parentDiv.innerHTML = '';


    //Found out I can use a ternary operator inside string interpolation.
    myLibrary.forEach((book,index) =>{
        const newDiv = document.createElement('div');
        newDiv.classList.add('book-card');
        newDiv.innerHTML = `
        <p>Author: ${book.author}</p>
        <p>Title: ${book.title}</p>
        <p>Pages: ${book.numberOfPages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class='delete-button' data-index='${index}'>Delete</button>
        <button class='read-button' data-index='${index}'>${book.read ? 'Unread' : 'Read'}</button>
        `;
        parentDiv.appendChild(newDiv);
    });
        
    const deleteButton = document.querySelectorAll('.delete-button');
    deleteButton.forEach(button => {
        button.addEventListener('click',() =>{
        const index = button.getAttribute('data-index');
        myLibrary.splice(index,1);
        updateBookDisplay();
        });
    });

    const readButton = document.querySelectorAll('.read-button');
    readButton.forEach(button =>{
        button.addEventListener('click', () =>{
        const index = button.getAttribute('data-index');
        //Figure out this as well
        myLibrary[index].toggleRead();
        updateBookDisplay();
        });
    });

}
//Figure out how to implement this yourself.
 Book.prototype.toggleRead = function(){
    this.read = !this.read;
 }

 const formValidation = () =>{
    const bookForm = document.querySelector('.bookForm');
    const author = document.querySelector('#author');
    const authorError = document.querySelector('#author-error');

    const title = document.querySelector('#title');
    const titleError = document.querySelector('#title-error');

    const numberOfPages = document.querySelector('#numberOfPages');
    const numPagesError = document.querySelector('#num-pages-error');

    author.addEventListener('input', ()=>{
        if(author.validity.valueMissing){
            author.setCustomValidity('Missing value.');
            authorError.textContent = author.validationMessage;
        }
        else if(author.validity.tooShort){
            author.setCustomValidity('Must be at least 4 characters long.');
            authorError.textContent = author.validationMessage;
        }
        else{
            author.setCustomValidity('');
            authorError.textContent = author.validationMessage;
        }

    });


    title.addEventListener('input', ()=>{
        if(title.validity.valueMissing){
            title.setCustomValidity('Missing value.');
            titleError.textContent = title.validationMessage;
        }
        else{
            title.setCustomValidity('');
            titleError.textContent = title.validationMessage;
        }

    });


    numberOfPages.addEventListener('input', ()=>{
        if(numberOfPages.validity.valueMissing){
            numberOfPages.setCustomValidity('Missing value.');
            numPagesError.textContent = numberOfPages.validationMessage;
        }
        else{
            numberOfPages.setCustomValidity('');
            numPagesError.textContent = numberOfPages.validationMessage;
        }

    });
 }
 formValidation();
