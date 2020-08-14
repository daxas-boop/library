let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        read === true ? read = "readed." : read = "not read yet."; 
        return `${title} by ${author}, ${pages} pages, ${read} `
    }
}

function addBookToLibrary() {
    //gets inputs
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('#read')
    read.checked ? read = true : read = false;

    // creates a book object
    let newBook = new Book(title, author, pages, read);
    // adds object to the "myLibrary" array
    myLibrary.push(newBook);
}

function render() {
    // reset the container
    // loops the array "myLibrary" 
    // display each book on the container
    const $bookContainer = document.querySelector('#book-container')
    $bookContainer.innerHTML = '';
    myLibrary.map( item => {
        const $book = document.createElement('div');
        $book.classList.add('book');
        const $title = document.createElement('h2');
        $title.classList.add('title');
        $title.innerText = item.title
        $book.appendChild($title);
        $bookContainer.appendChild($book)
    });

}

function hideForm(){
    document.querySelector('#form').classList.add('hidden');
}

function resetInputs(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
}

const $newBook = document.querySelector('#new-book');
$newBook.addEventListener('click', () => {
    document.querySelector('#form').classList.remove('hidden');
});

const $submit = document.querySelector('#submit');
$submit.addEventListener('click', e => {
    e.preventDefault();
    // verify inputs
    addBookToLibrary();
    hideForm();
    resetInputs();
    render();
});


// function verifyInputs(){
//     let errorCounter = 0;
//     const titleDisplay  = document.querySelector('#title')
//     const authorDisplay = document.querySelector('#author')
//     const pagesDisplay  = document.querySelector('#pages')
//     // verify that the title has no more than 30 characters
//     // show error
//     if(title.length > 30) {
//         errorCounter++
//         titleDisplay.classList.add('error')
//     }   
//     // verify that the author has no more than 30 characters
//     // show error
//     if(author.length > 30) {
//         errorCounter++
//         authorDisplay.classList.add('error')
//     } 
//     // verify that the pages are no more than 22,400 pages(most pages in a book)
//     // show error
//     if(pages > 22400) {
//         errorCounter++
//         pagesDisplay.classList.add('error')
//     }
// }