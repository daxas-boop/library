let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === true ? 'Read' : 'Not read' 
    this.toggleRead = () => { 
        if(this.read === 'Read'){
            this.read = 'Not Read'
        } else {
            this.read = 'Read'
        }
    };
    
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('#read')
    read.checked ? read = true : read = false;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render() {
    const $bookContainer = document.querySelector('#book-container')
    $bookContainer.innerHTML = '';
    myLibrary.map( item => {
        const $book = document.createElement('div');
        $book.classList.add('book');
        $book.setAttribute('data-book', `${myLibrary.indexOf(item)}`)
        const $deleteBook = document.createElement('span');
        $deleteBook.classList.add('close-button');
        $deleteBook.innerText = '×';
        $deleteBook.addEventListener('click', e => {
            deleteBook(e);
            render(); 
        });
        const $title = document.createElement('h1');
        $title.classList.add('title');
        $title.innerText = item.title;
        const $author = document.createElement('p');
        $author.innerText = `Author: ${item.author}`;
        $author.classList.add('author');
        const $pages = document.createElement('p');
        $pages.innerText = `Pages: ${item.pages}`;
        $pages.classList.add('pages');
        const $read = document.createElement('p');
        $read.innerText = item.read;
        $read.classList.add('read');
        $read.addEventListener('click', e => {
            item.toggleRead();
            $read.innerText = item.read;
        });
        $book.appendChild($deleteBook);
        $book.appendChild($title)
        $book.appendChild($author)
        $book.appendChild($pages)
        $book.appendChild($read)
        $bookContainer.appendChild($book)
    });
}

function resetInputs(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    document.querySelector('#title').classList.remove('error')
    document.querySelector('#author').classList.remove('error')
    document.querySelector('#pages').classList.remove('error')
}

function deleteBook(e) {
    const $book = e.target.parentNode;
    myLibrary.splice($book.dataset.book, 1);
    $book.remove();
    setStorage();
}

function newBook(){
    const $newBook = document.querySelector('#new-book');
    const $form = document.querySelector('#form-container');
    $newBook.addEventListener('click', () => {
        if ($form.classList.contains('open')){
            $form.classList.remove('open')
        } else {
            $form.classList.add('open')
        }
    });
}

function verifyTitle(title) {
    title = title.trim();
    if(title.length > 40){
        return 'The length of the title should be less than 30 characters.'
    }
    if(title === ''){
        return 'The title should not be empty.'
    }
    return '';
}

function verifyAuthor(author) {
    author = author.trim();
    if(author.length > 30){
        return 'The length of the author should be less than 30 characters'
    }
    if(author === ''){
        return 'The author should not be empty.'
    }
    return '';
}

function verifyPages(pages){
    if(pages > 22400){
        return 'The pages should not be longer than 22.400'
    }
    if(pages === ''){
        return 'The pages should not be empty.'
    }
    return '';
}

function verifyInput(){
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value

    let errorTitle = verifyTitle(title);
    let errorAuthor = verifyAuthor(author);
    let errorPages = verifyPages(pages);

    let errors = {
        title: errorTitle,
        author: errorAuthor,
        pages: errorPages
    }

    const noErrors = manageErrors(errors) === 0;
    if(noErrors){
        addBookToLibrary();
        closeForm();
        resetInputs();
        setStorage();
        render();
    }
}

function manageErrors(errors) {
    const $form = document.querySelector('#form');
    let keys = Object.keys(errors);
    let errorCounter = 0;
    keys.forEach(key => {
       let error = errors[key];
       if(error){
           errorCounter++
           $form[key].classList.add('error');
           key = key + '-error'
           document.querySelector(`#${key}`).innerText = error;
       }else {
           $form[key].classList.remove('error');
           key = key + '-error'
           document.querySelector(`#${key}`).innerText = ''
       }
    });
    return errorCounter;
}

const $closeForm = document.querySelector('#close-form');
$closeForm.addEventListener('click', () => {
    closeForm();
});

function submitForm(){
    const $submit = document.querySelector('#submit');
    $submit.addEventListener('click', e => {
        e.preventDefault();
        verifyInput();
    });
}

function closeForm(){
    const $form = document.querySelector('#form-container');   
        $form.classList.remove('open');
}

function setStorage(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

newBook();
submitForm();
