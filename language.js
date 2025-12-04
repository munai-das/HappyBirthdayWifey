const LANGUAGE_STORAGE_KEY = 'hbw_language';

function getSavedLanguage(defaultLanguage = 'en') {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'pt' ? 'pt' : defaultLanguage;
}

function saveLanguage(language) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

function toggleLanguage(language) {
    const nextLanguage = language === 'pt' ? 'en' : 'pt';
    saveLanguage(nextLanguage);
    return nextLanguage;
}
