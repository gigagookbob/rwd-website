(function () {
  var STORAGE_KEY = 'rwd-lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ko'];

  var translations = {};

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var browser = navigator.language.slice(0, 2);
    return SUPPORTED.indexOf(browser) !== -1 ? browser : DEFAULT_LANG;
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Update active lang indicator
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      if (opt.dataset.lang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    document.documentElement.lang = lang;
  }

  function loadLang(lang) {
    fetch('i18n/' + lang + '.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        translations = data;
        applyTranslations(lang);
        localStorage.setItem(STORAGE_KEY, lang);
      })
      .catch(function () {
        // Fallback: keep HTML defaults (English)
      });
  }

  function init() {
    var lang = detectLang();
    loadLang(lang);

    // Lang toggle click handler
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = localStorage.getItem(STORAGE_KEY) || detectLang();
        var next = current === 'en' ? 'ko' : 'en';
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
