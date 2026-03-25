(function () {
  var STORAGE_KEY = 'rwd-lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ko'];

  var translations = {};
  var currentLang = DEFAULT_LANG;

  function reveal() {
    document.documentElement.classList.remove('i18n-loading');
  }

  function getSavedLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return (saved && SUPPORTED.indexOf(saved) !== -1) ? saved : null;
    } catch (e) {
      return null;
    }
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
    fetch('i18n/' + lang + '.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        translations = data;
        applyTranslations(lang);
        localStorage.setItem(STORAGE_KEY, lang);
      })
      .catch(function () {})
      .then(reveal);
  }

  function init() {
    var saved = getSavedLang();

    if (saved && saved !== DEFAULT_LANG) {
      loadLang(saved);
    } else {
      applyTranslations(DEFAULT_LANG);
      reveal();
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
