'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);
// Inside your existing JavaScript file

// Create User
document.getElementById('create-user-form').addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent page reload

  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;

  // Make POST request to Cosmocloud Create User API
  fetch('https://free-ap-south-1.cosmocloud.io/development/api/user', {  // Replace with your API URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('User created:', data);
    // Display success message or update the UI
  })
  .catch(error => console.error('Error creating user:', error));
});
// Fetch User by ID
document.getElementById('fetch-user-btn').addEventListener('click', function () {
  const userId = document.getElementById('fetch-user-id').value;

  // Make GET request to Cosmocloud Fetch User API
  fetch(`https://free-ap-south-1.cosmocloud.io/development/api/user/${userId}`, {  // Replace with your API URL
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('User fetched:', data);

    // Display the fetched user information in the frontend
    document.getElementById('user-info').innerHTML = `
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
    `;
  })
  .catch(error => console.error('Error fetching user:', error));
});
// Delete User by ID
document.getElementById('delete-user-btn').addEventListener('click', function () {
  const userId = document.getElementById('delete-user-id').value;

  // Make DELETE request to Cosmocloud Delete User API
  fetch(`https://free-ap-south-1.cosmocloud.io/development/api/user/${userId}`, {  // Replace with your API URL
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('User deleted');
      // Update the UI to show that the user has been deleted
      alert('User successfully deleted');
    } else {
      console.error('Error deleting user');
    }
  })
  .catch(error => console.error('Error deleting user:', error));
});


