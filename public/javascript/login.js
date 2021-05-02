async function loginFormHandler(event) {
     event.preventDefault();
   
     const email = document.querySelector('#username-login').value.trim();
     const password = document.querySelector('#password-login').value.trim();
   
     if (email && password) {
       const response = await fetch('/api/users/login', {
         method: 'post',
         body: JSON.stringify({
           username,
           password
         }),
         headers: { 'Content-Type': 'application/json' }
       });
       
       console.log('RESPONSE', response);
       if (response.ok) {
         document.location.replace('/dashboard');
       } else {
         alert(response.statusText);
       }
     }
   };

   document.querySelector('#login-submit-button').addEventListener('submit', loginFormHandler);