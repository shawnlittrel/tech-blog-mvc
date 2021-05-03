async function commentHandler(event) {
     event.preventDefault();

     const text = document.querySelector('#new-comment-text').value.trim();

     const response = await fetch('/api/posts/:id', {
          method: 'post',
          body: JSON.stringify({
               text
          }),
          headers: { 'Content-Type': 'application/json' }
     });

     if (response.ok) {
          document.location.reload()
     } else {
          alert(response.statusText);
     }
}

document.querySelector('#new-comment-btn').addEventListener('click', commentHandler);