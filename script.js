/**Book class */
class Book{
   constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
   }
   
   toggleReadStatus(){
        this.read = !this.read;
   }
}

class BookLibrary{
    constructor(){
        this.bookLibrary = [];
    }

    /**Add a book to the array of books - no checking of repeated books, yet*/
    addBookToLibrary(title, author, pages, read) {
        //add book to array later. Can add counts for the total, later.
        this.bookLibrary.push(new Book(title, author, pages, read));
        this.cleanBookList();
        this.presentBooks();
    }

    //Remove all the book items from the dom
    cleanBookList(){
        const bookItems = document.querySelectorAll(".book-item");
        bookItems.forEach(element => {
            element.remove();
        });
    }

    //Present all book items from the array
    presentBooks(){
        this.bookLibrary.forEach(element => {
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
            const bookAuthor = this.createPElement(`By: ${element.author}`);
            bookAuthor.classList.add("author");
            listItem.appendChild(bookAuthor);
            //
            const NumberPages = this.createPElement(`Numbering: ${element.pages} pages`);
            NumberPages.classList.add("pages");
            listItem.appendChild(NumberPages);
            // 
            const readStatus = element.read ? this.createPElement(`Has been read`) : this.createPElement(`Hasn't been read`); 
            readStatus.classList.add("read");
            listItem.appendChild(readStatus);

            //create the container for the buttons
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("buttons");

            //create, add and bind, button for deleting books
            this.addAButton("remove-button", "button", "Remove book", buttonContainer);

            //create, add and bind, a button to mark as read or (unread)
            this.addAButton("mark-read-button", "button", element.read ? "mark as unread" : "Mark as read", buttonContainer);

            //append button container to item
            listItem.appendChild(buttonContainer);

            //append item to the book container            
            BookContainer.appendChild(listItem);
        });
    }

    /**Finds the first book, by title, in the book array, and returns the index. Returns -1 if didnt find*/
    findBookByTitle(title){
        //remove from the array
        const found = this.bookLibrary.find((element)=>element.title === title);
        return this.bookLibrary.indexOf(found);   
    }

    createPElement(text){
        const para = document.createElement("p");
        const node = document.createTextNode(text);
        para.appendChild(node);
        return para;
    }
    
    addAButton(inClass, inType, inTextContent, inAppendTo){  
        
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
                    const index = this.findBookByTitle(bookItem.querySelector(".title").textContent);                
                    if(index!=-1){
                        this.bookLibrary.splice(index, 1);
                    }
                    console.log(this.bookLibrary);
                }else{
                    console.error("Could not find the class book-item.");
                }
            })
        }else if (inClass === "mark-read-button"){
            button.addEventListener("click", (element)=>{
                const bookItem = element.currentTarget.parentElement.parentElement;
                if(bookItem.classList.contains("book-item")){
                    //get item in array -> check the boolean and toggle
                    const index = this.findBookByTitle(bookItem.querySelector(".title").textContent);
                    if(index!=-1){
                        const bookRead = this.bookLibrary[index].read;
                        if(bookRead){
                            bookItem.querySelector(".read").textContent="Hasn't been read";
                            element.currentTarget.textContent = "Mark as read";
                        }else{
                            bookItem.querySelector(".read").textContent="Has been read";
                            element.currentTarget.textContent = "Mark as unread";
                        }
                        this.bookLibrary[index].toggleReadStatus();
                        console.log(this.bookLibrary[index]);
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
    
    /**binds an event to the form on submit such that the information is used for adding books*/
    bindForm() {
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
            this.addBookToLibrary(title,author,pages,read);
        })
    }
}

//EXECUTE
const library = new BookLibrary();
library.bindForm();
library.addBookToLibrary("Schweeb Chronicles - vol 1", "Adolf Goldbergenstein", 543, false);
library.addBookToLibrary("Schweeb Chronicles - vol 2", "Adolf Goldbergenstein", 543, false);
library.addBookToLibrary("Schweeb Chronicles - vol 3", "Adolf Goldbergenstein", 543, false);
library.addBookToLibrary("Schweeb Chronicles - vol 4", "Adolf Goldbergenstein", 543, false);
library.addBookToLibrary("Schweeb Chronicles - vol 5", "Adolf Goldbergenstein", 543, false);
library.addBookToLibrary("Schweeb Chronicles - vol 6", "Adolf Goldbergenstein", 543, false);


