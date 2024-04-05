export const filterTranslationsByLang = (menu: any, lang: string) => {
  if (menu.translations) {
    menu.translations = menu.translations.filter((t) => t.lang === lang);
  }

  if (menu.children) {
    menu.children.forEach((child) => filterTranslationsByLang(child, lang));
  }
};
