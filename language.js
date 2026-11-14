/** Keep original text nodes and attributes so switching never replaces icons or links. */
(() => {
  const root = document.documentElement;
  const dictionary = window.portfolioArabic || {};
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  const entries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, template, [hidden], #typing-text, .language-toggle')) continue;
    const key = normalize(node.nodeValue);
    if (Object.hasOwn(dictionary, key)) entries.push({ node, original: node.nodeValue, translated: node.nodeValue.replace(/\S[\s\S]*\S|\S/, dictionary[key]) });
  }
  const attributes = [];
  document.querySelectorAll('[aria-label], img[alt]').forEach(element => {
    for (const name of ['aria-label', 'alt']) {
      const original = element.getAttribute(name);
      if (Object.hasOwn(dictionary, original)) attributes.push({ element, name, original, translated: dictionary[original] });
    }
  });
  const toggle = document.querySelector('.language-toggle');
  const originalTitle = document.title;
  const descriptions = [...document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[property="twitter:description"]')].map(element => ({element, original: element.content}));
  const titles = [...document.querySelectorAll('meta[property="og:title"], meta[property="twitter:title"]')].map(element => ({element, original: element.content}));
  function applyLanguage(language) {
    const arabic = language === 'ar';
    root.lang = arabic ? 'ar' : 'en';
    root.dir = arabic ? 'rtl' : 'ltr';
    entries.forEach(entry => { entry.node.nodeValue = arabic ? entry.translated : entry.original; });
    attributes.forEach(entry => entry.element.setAttribute(entry.name, arabic ? entry.translated : entry.original));
    document.title = arabic ? 'ياسين زقوت | مطوّر تطبيقات موبايل' : originalTitle;
    titles.forEach(({element, original}) => { element.content = arabic ? document.title : original; });
    descriptions.forEach(({element, original}) => { element.content = arabic ? 'الموقع الشخصي لياسين زقوت، مطوّر تطبيقات موبايل متخصص في Flutter وAndroid والبنية البرمجية النظيفة والتدريب التقني.' : original; });
    toggle.textContent = arabic ? 'English' : 'العربية';
    toggle.lang = arabic ? 'en' : 'ar';
    toggle.setAttribute('aria-label', arabic ? 'Switch to English' : 'التبديل إلى العربية');
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: root.lang } }));
  }
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('portfolio-language'); } catch { /* Storage may be blocked. */ }
  applyLanguage(savedLanguage === 'ar' ? 'ar' : 'en');
  toggle.addEventListener('click', () => {
    const language = root.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(language);
    try { localStorage.setItem('portfolio-language', language); } catch { /* Switching still works without persistence. */ }
  });
})();
