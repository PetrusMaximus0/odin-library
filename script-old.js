const bookLibrary = [];

/**Book constructor */
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}
/**Book methods*/
Book.prototype.toggleReadStatus = function(){
    this.read=!this.read;
}

/**Add a book to the array of books - no checking of repeated books, yet*/
function addBookToLibrary(title, author, pages, read) {
    //add book to array later. Can add counts for the total, later.
    bookLibrary.push(new Book(title, author, pages, read));
    cleanBookList();
    presentBooks();
}

function createPElement(text){
    const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);
    return para;
}

function addAButton(inClass, inType, inTextContent, inAppendTo){  
    
    //create a button to mark as read or (unread)
    const button = document.createElement("button");
    button.className =  inClass;
    button.type = inType;
    button.textContent = inTextContent;
    
    //bind button
    if(inClass === "remove-button"){
        button.addEventListener("click", (element)=>{
            const bookItem = element.currentTarget.parentElement.parentElement;
            if(bookItem.classList.contains("book-item")){
                //remove from the dom
                bookItem.remove();
                //remove from the array
                const index = findBookByTitle(bookItem.querySelector(".title").textContent);                
                if(index!=-1){
                    bookLibrary.splice(index, 1);
                }
                console.log(bookLibrary);
            }else{
                console.error("Could not find the class book-item.");
            }
        })
    }else if (inClass === "mark-read-button"){
        button.addEventListener("click", (element)=>{
            const bookItem = element.currentTarget.parentElement.parentElement;
            if(bookItem.classList.contains("book-item")){
                //get item in array -> check the boolean and toggle
                const index = findBookByTitle(bookItem.querySelector(".title").textContent);
                if(index!=-1){
                    const bookRead = bookLibrary[index].read;
                    if(bookRead){
                        bookItem.querySelector(".read").textContent="Hasn't been read";
                        element.currentTarget.textContent = "Mark as read";
                    }else{
                        bookItem.querySelector(".read").textContent="Has been read";
                        element.currentTarget.textContent = "Mark as unread";
                    }
                    bookLibrary[index].toggleReadStatus();
                    console.log(bookLibrary[index]);
                }
            }else{
                console.error("Could not find the class book-item.");
            }
        })
    }
   
    //append button to container
    inAppendTo.appendChild(button);
    //
}
/**Finds the first book, by title, in the book array, and returns the index. Returns -1 if didnt find*/
function findBookByTitle(title){
    //remove from the array
    const found = bookLibrary.find((element)=>element.title === title);
    return bookLibrary.indexOf(found);   
}
//Remove all the book items from the dom
function cleanBookList(){
    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach(element => {
        element.remove();
    });
}
//Present all book items from the array
function presentBooks(){
    bookLibrary.forEach(element => {
        //find the correct location to produce the books
        const BookContainer = document.querySelector(".book-container");
        if(!BookContainer) {
            console.error("Couldn't find the book container element!");
            return;
        }
        //create a li element
        const listItem = document.createElement("li");
        listItem.classList.add("book-item");

        //create the content for the li
        const bookTitle = document.createElement("h2");
        bookTitle.textContent = element.title;
        bookTitle.classList.add("title");
        listItem.appendChild(bookTitle);
        //
        const bookAuthor = createPElement(`By: ${element.author}`);
        bookAuthor.classList.add("author");
        listItem.appendChild(bookAuthor);
        //
        const NumberPages = createPElement(`Numbering: ${element.pages} pages`);
        NumberPages.classList.add("pages");
        listItem.appendChild(NumberPages);
        // 
        const readStatus = element.read ? createPElement(`Has been read`) : createPElement(`Hasn't been read`); 
        readStatus.classList.add("read");
        listItem.appendChild(readStatus);

        //create the container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttons");

        //create, add and bind, button for deleting books
        addAButton("remove-button", "button", "Remove book", buttonContainer);

        //create, add and bind, a button to mark as read or (unread)
        addAButton("mark-read-button", "button", element.read ? "mark as unread" : "Mark as read", buttonContainer);

        //append button container to item
        listItem.appendChild(buttonContainer);

        //append item to the book container            
        BookContainer.appendChild(listItem);
    });
}

/**binds an event to the form on submit such that the information is used for adding books*/
function bindForm() {
    const loginForm = document.getElementById("add-book-form");
    loginForm.addEventListener("submit", (element)=>{
        element.preventDefault();
        //retrieve information from the form
        const title = document.getElementById("title").value;
        const read = document.getElementById("read").checked;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        console.log(title,read,author,pages);
        //reset the form fields?
        loginForm.reset();
        //add to library
        addBookToLibrary(title,author,pages,read);
    })
}

//EXECUTE
bindForm();
addBookToLibrary("Schweeb Chronicles - vol 1", "Adolf Goldbergenstein", 543, false);
addBookToLibrary("Schweeb Chronicles - vol 2", "Adolf Goldbergenstein", 543, false);
addBookToLibrary("Schweeb Chronicles - vol 3", "Adolf Goldbergenstein", 543, false);
addBookToLibrary("Schweeb Chronicles - vol 4", "Adolf Goldbergenstein", 543, false);
addBookToLibrary("Schweeb Chronicles - vol 5", "Adolf Goldbergenstein", 543, false);
addBookToLibrary("Schweeb Chronicles - vol 6", "Adolf Goldbergenstein", 543, false);


