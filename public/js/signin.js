// Handles on-click event for the login page
const loginForm = async (e) => {
  e.preventDefault();

  // Retrieve values from the login form
  const email = document.querySelector('#signin-email').value.trim();
  const password = document.querySelector('#signin-password').value.trim();

  if (email && password) {
    // Send POST request to the 'user' endpoint
    const response = await fetch('/user/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect user to dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

/* Fetch server endpoint and response. Populate password input
   within signup form. */
const generatePassword = async (e) => {
  e.preventDefault();
    // Send GET request to the 'user' endpoint
    fetch('/user/signup/genpass', {
      method: 'GET',
    }).then(async response => {
      if (response.ok) {
        let password = await response.text();
        document.querySelector('#signup-password').value = password;
      } else {
        alert(response.statusText);
      }
    })
};

// Hide passwords when user moves onto role drop-down box
document
  .querySelector('#signup-role')
  .addEventListener('change', (e) => {
    e.preventDefault();
    let passwordInput = document.querySelector('#signup-password');
    if (passwordInput.value != '') {
      passwordInput.setAttribute('type', 'password');
    }
    if (passwordInput.value.length < 8) {
      alert('Please choose a password that is at least 8 characters long');
      passwordInput.value = '';
    }
    return;
  })

// Handles on-click event for the signup page
const signupForm = async (e) => {
  e.preventDefault();
  // checkPassword();
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const role_id = document.querySelector('#signup-role').value.trim();
  const is_customer = role_id == 1 ? true : false;

  if (username && email && password && role_id) {
    // Send POST request to the 'user' endpoint
    const response = await fetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role_id, is_customer }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect user to dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

/* Listen out for a form submission on the signin.handlebars page.
   If form is submitted then execute relevant function. */
document
  .querySelector('.signin-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);

/* Listen out for button click for generating a secure password.
   Execute function when clicked. */
document
  .querySelector('#gen')
  .addEventListener('click', generatePassword);