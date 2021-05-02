function addPostHandler(event) {
     event.preventDefault();

     document.location.replace('/add-blog');
}

document.querySelector('#new-post-button').addEventListener('click', addPostHandler);