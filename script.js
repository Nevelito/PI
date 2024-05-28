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
});

function acceptCookies() {
    document.getElementById('cookie-consent').style.display = 'none';
}