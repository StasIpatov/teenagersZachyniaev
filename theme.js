function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

let gear = document.getElementById('gear')
let themeDiv = document.getElementById('theme-s')
let bod = document.querySelector('body')

gear.onclick = function(){
    themeDiv.style.display = 'flex'
}

let blue = document.getElementById('blue')
let red = document.getElementById('red')
let green = document.getElementById('green')

const savedTheme = getCookie('theme'); // ✅ тепер працює
if (savedTheme) {
  bod.classList.add(savedTheme);
}

function setTheme(themeName) {
  bod.classList.remove('blue-color', 'green-color', 'burning-color');
  bod.classList.add(themeName);
  setCookie('theme', themeName, 365);
  themeDiv.style.display = 'none';
}

blue.onclick = () => setTheme('blue-color');
red.onclick = () => setTheme('burning-color');
green.onclick = () => setTheme('green-color');