// tests/stringUtils.test.js
const { slugify, truncateText, countWords } = require('../src/stringUtils');

test('Модульний тест 1: формування slug з рядка', () => {
    expect(slugify('  Hello World!  ')).toBe('hello-world');
    expect(slugify('')).toBe('');
});

test('Модульний тест 2: скорочення довгого тексту з трикрапкою', () => {
    expect(truncateText('Короткий текст', 30)).toBe('Короткий текст');
    expect(truncateText('Дуже довгий рядок для перевірки обрізання', 11)).toBe('Дуже довгий...');
});

test('Модульний тест 3: підрахунок кількості слів у рядку', () => {
    expect(countWords('Раз   два три')).toBe(3);
    expect(countWords('   ')).toBe(0);
});