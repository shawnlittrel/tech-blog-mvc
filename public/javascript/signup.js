async function signupFormHandler(event){
     event.preventDefault();

     const username = document.querySelector('#username-signup').value.trim();
     const email = document.querySelector('#email-signup').value.trim();
     const password = document.querySelector('#password-signup').value.trim();

     if (username && password && email) {
          const response = await fetch('/api/users', {
               method: 'post',
               body: JSON.stringify({
                    username,
                    email,
                    password
               }),
               headers: { 'Content-Type': 'application/json' }
          });
          //check response status
          if (response.ok) {
            console.log('Success');   
          } else {
               alert(response.statusText);
          }
          
     }

};

document.querySelector('#register-submit-button').addEventListener('submit', signupFormHandler);