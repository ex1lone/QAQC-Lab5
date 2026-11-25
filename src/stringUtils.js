// src/stringUtils.js

function slugify(text) {
    if (!text) return '';
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9а-яіїєґ\s-]/gi, '')
        .replace(/\s+/g, '-');
}

function truncateText(text, maxLength = 20) {
    if (typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function countWords(text) {
    if (!text || typeof text !== 'string') return 0;
    const words = text.trim().match(/\S+/g);
    return words ? words.length : 0;
}

module.exports = { slugify, truncateText, countWords };