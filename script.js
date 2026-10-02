const languageButtons = document.querySelectorAll('.lang-btn');
const translatable = document.querySelectorAll('[data-en][data-gu]');

function setLanguage(language) {
  const isGujarati = language === 'gu';
  document.documentElement.lang = isGujarati ? 'gu' : 'en';
  document.body.classList.toggle('lang-gu', isGujarati);
  document.title = isGujarati
    ? 'રાઉલજી લો એસોસિએટ | નડિયાદ, ગુજરાત'
    : 'Raulji Law Associate | Nadiad, Gujarat';
  document.querySelector('meta[name="description"]').content = isGujarati
    ? 'રાઉલજી લો એસોસિએટ, નડિયાદ. ગુજરાતની જમીન-મહેસૂલ સંબંધિત બાબતો, દસ્તાવેજો અને સામાન્ય કાનૂની સેવાઓ માટે માહિતી.'
    : 'Raulji Law Associate, Nadiad. Information about Gujarat land and revenue matters, document services and legal practice.';
  translatable.forEach((element) => {
    element.innerHTML = element.dataset[isGujarati ? 'gu' : 'en'];
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('raulji-language', language); } catch (_) { /* Storage may be disabled. */ }
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

try {
  const savedLanguage = localStorage.getItem('raulji-language');
  if (savedLanguage === 'en' || savedLanguage === 'gu') setLanguage(savedLanguage);
} catch (_) { /* Gujarati remains the default. */ }
