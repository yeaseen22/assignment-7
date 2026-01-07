const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  bn: () => import('../locales/bn.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
    let dict;
    if (dictionaries[locale]) {
        dict = await dictionaries[locale]();
    } else {
        // Fallback to default locale if the requested locale is not found
        dict = await dictionaries['en']();
        locale = 'en'; // Ensure locale is set to 'en' if fallback is used
    }
    return { ...dict, lang: locale }; // Add the lang property
};
