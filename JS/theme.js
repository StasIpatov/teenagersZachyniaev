let gear = document.getElementById('gear')
let themeDiv = document.getElementById('themeDiv')
let done = document.getElementById('done')

gear.onclick = function(){
    themeDiv.style.display = 'flex'
}

done.onclick = function(){
    themeDiv.style.display = 'none'
}

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

document.addEventListener('DOMContentLoaded', () => {
    const bod = document.body;
    const blue = document.getElementById('blue');
    const red = document.getElementById('red');
    const green = document.getElementById('green');
    const clear = document.getElementById('clear');

    // --- cookie functions ---
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24*60*60*1000);
        expires = "; expires=" + d.toUTCString();
      }
      document.cookie = name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
    }

    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
      }
      return null;
    }

    function eraseCookie(name) {
      setCookie(name, "", -1);
    }

    // --- helpers ---
    function applyTheme(themeName) {
      bod.classList.remove('blue-color','green-color','burning-color');
      if (themeName) bod.classList.add(themeName);
    }

    function saveTheme(themeName) {
      try {
        // пробуємо localStorage
        localStorage.setItem('theme', themeName);
        console.log('Saved to localStorage:', themeName);
      } catch (e) {
        // якщо localStorage недоступний (private mode або помилка) — fallback на cookie
        console.warn('localStorage недоступний, використовуємо cookie. Помилка:', e);
        setCookie('theme', themeName, 365);
        console.log('Saved to cookie:', themeName);
      }
    }

    function loadTheme() {
      try {
        const t = localStorage.getItem('theme');
        if (t) {
          console.log('Loaded from localStorage:', t);
          return t;
        }
      } catch (e) {
        console.warn('localStorage read error:', e);
      }
      // fallback -> cookie
      const ck = getCookie('theme');
      if (ck) {
        console.log('Loaded from cookie:', ck);
        return ck;
      }
      console.log('No saved theme found');
      return null;
    }

    // --- init ---
    const saved = loadTheme();
    if (saved) applyTheme(saved);

    // --- button handlers ---
    blue.addEventListener('click', () => { applyTheme('blue-color'); saveTheme('blue-color'); });
    red.addEventListener('click', () => { applyTheme('burning-color'); saveTheme('burning-color'); });
    green.addEventListener('click', () => { applyTheme('green-color'); saveTheme('green-color'); });
    clear.addEventListener('click', () => {
      try { localStorage.removeItem('theme'); console.log('localStorage cleared'); } catch(e){console.warn(e);}
      eraseCookie('theme'); console.log('cookie cleared');
      applyTheme(null);
    });
  });