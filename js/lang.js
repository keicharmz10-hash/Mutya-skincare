function setLang(lang) {
  document.querySelectorAll('[data-ja]').forEach(el => {

    // ❗ Skip language switch buttons
    if (el.classList.contains('lang-btn')) return;

    const text = el.dataset[lang];
    if (!text) return;

    // ✅ INPUT / TEXTAREA → change placeholder
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
      return;
    }

    // ✅ Normal elements → change text (with <br>)
    el.innerHTML = text.replace(/\//g, '<br>');
  });

  // Save language preference
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'ja';
  setLang(savedLang);
});