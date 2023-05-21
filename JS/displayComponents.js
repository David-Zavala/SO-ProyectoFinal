const navbarElement = document.getElementById('navbar');
const headerElement = document.getElementById('header');
const clockElement = document.getElementById('clock');
fetch('components/navbar.html').then(response => response.text()).then(html => {navbarElement.innerHTML = html;});
fetch('components/header.html').then(response => response.text()).then(html => {headerElement.innerHTML = html;});
fetch('components/clock.html').then(response => response.text()).then(html => {clockElement.innerHTML = html;});