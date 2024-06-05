document.addEventListener('DOMContentLoaded', function () {
    const langSwitcher = document.querySelectorAll('.language-switcher a');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    function updateContent(language) {
        fetch(`content_${language}.json`)
            .then(response => response.json())
            .then(data => {
                elementsToTranslate.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (data[key]) {
                        el.textContent = data[key];
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    }

    langSwitcher.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            updateContent(selectedLang);
        });
    });

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggleButton.classList.toggle('btn-dark');
        themeToggleButton.classList.toggle('btn-light');
    });

    updateContent('pl');

    if(getCookie("acceptedCookie") == "true")
    {
        document.getElementById('cookie-consent').style.display = 'none';
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function acceptCookies() {
    document.getElementById('cookie-consent').style.display = 'none';
    setCookie("acceptedCookie", "true", 7);
}