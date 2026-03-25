(function () {
  var STORAGE_KEY = 'rwd-lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ko'];

  var translations = {};
  var currentLang = DEFAULT_LANG;

  function getSavedLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return (saved && SUPPORTED.indexOf(saved) !== -1) ? saved : null;
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.querySelectorAll('.lang-option').forEach(function (opt) {
      if (opt.dataset.lang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    document.documentElement.lang = lang;
    currentLang = lang;
  }

  function loadLang(lang) {
    if (lang === DEFAULT_LANG) {
      // English is already in HTML — no fetch needed
      localStorage.setItem(STORAGE_KEY, lang);
      applyTranslations(lang);
      document.body.classList.remove('i18n-loading');
      return;
    }

    fetch('i18n/' + lang + '.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        translations = data;
        applyTranslations(lang);
        localStorage.setItem(STORAGE_KEY, lang);
      })
      .catch(function () {
        // Fallback: keep English
      })
      .then(function () {
        document.body.classList.remove('i18n-loading');
      });
  }

  function init() {
    var saved = getSavedLang();

    if (saved && saved !== DEFAULT_LANG) {
      // User previously chose non-English — hide body while loading
      document.body.classList.add('i18n-loading');
      loadLang(saved);
    } else {
      // First visit or English chosen — no loading needed
      applyTranslations(DEFAULT_LANG);
    }

    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = currentLang === 'en' ? 'ko' : 'en';
        loadLang(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
