const navbarElement = document.getElementById('navbar');
const headerElement = document.getElementById('header');
fetch('components/navbar.html').then(response => response.text()).then(html => {navbarElement.innerHTML = html;});
fetch('components/header.html').then(response => response.text()).then(html => {headerElement.innerHTML = html;});