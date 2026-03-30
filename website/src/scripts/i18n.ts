import zh from '../i18n/zh.json';
import en from '../i18n/en.json';

type Lang = 'zh' | 'en';
type Translations = Record<string, string>;

const translations: Record<Lang, Translations> = { zh, en };

let currentLang: Lang = 'zh';

function applyLanguage(lang: Lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const raw = el.dataset.i18nAttr!;
    const [attr, key] = raw.split(':');
    if (t[key] !== undefined) {
      el.setAttribute(attr, t[key]);
    }
  });
  // Direct data-zh / data-en swap (used in blog for dynamic content)
  document.querySelectorAll<HTMLElement>('[data-zh][data-en]').forEach((el) => {
    el.textContent = lang === 'zh' ? el.dataset.zh! : el.dataset.en!;
  });
  document.querySelectorAll<HTMLElement>('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('lang', lang);
}

export function initI18n() {
  const saved = localStorage.getItem('lang') as Lang | null;
  applyLanguage(saved ?? 'zh');

  document.querySelectorAll<HTMLElement>('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang as Lang);
    });
  });
}
