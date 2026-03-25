// === Terminal Animation ===
function initTerminalAnimation() {
  var terminal = document.getElementById('terminalDemo');
  if (!terminal) return;

  var lines = terminal.querySelectorAll('.term-line');
  var animated = false;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          lines.forEach(function (line) {
            var delay = parseInt(line.dataset.delay, 10) * 400;
            setTimeout(function () { line.classList.add('show'); }, delay);
          });
          observer.unobserve(terminal);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(terminal);
}

// === Clipboard Copy ===
function initClipboardCopy() {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        var code = btn.parentElement.querySelector('.install-cmd');
        if (code) {
          var range = document.createRange();
          range.selectNodeContents(code);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    });
  });
}

// === FAQ Accordion ===
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// === Scroll Fade-in ===
function initScrollFadeIn() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(function (el) { observer.observe(el); });
}

// === Init ===
document.addEventListener('DOMContentLoaded', function () {
  initTerminalAnimation();
  initClipboardCopy();
  initFaqAccordion();
  initScrollFadeIn();
});
