const LANGUAGE_STORAGE_KEY = 'hbw_language';
const TRANSLATION_CACHE_KEY = 'hbw_translation_cache';

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

function getTranslationCache() {
    try {
        return JSON.parse(localStorage.getItem(TRANSLATION_CACHE_KEY)) || {};
    } catch (error) {
        console.warn('Could not parse translation cache', error);
        return {};
    }
}

function setTranslationCache(cache) {
    try {
        localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        console.warn('Could not save translation cache', error);
    }
}

async function translateTextToPortuguese(text) {
    if (!text || typeof text !== 'string') return text;

    const cache = getTranslationCache();
    if (cache[text]) return cache[text];

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-BR`);
        const data = await response.json();
        const translated = data?.responseData?.translatedText || text;
        cache[text] = translated;
        setTranslationCache(cache);
        return translated;
    } catch (error) {
        console.warn('Translation failed, using fallback', error);
        return text;
    }
}

async function translateListToPortuguese(list) {
    return Promise.all(list.map((item) => translateTextToPortuguese(item)));
}

async function translateStructuredList(list, keys) {
    const translated = [];
    for (const entry of list) {
        const copy = { ...entry };
        for (const key of keys) {
            if (copy[key]) {
                copy[key] = await translateTextToPortuguese(copy[key]);
            }
        }
        translated.push(copy);
    }
    return translated;
}
