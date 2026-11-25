// src/orderService.js
const axios = require('axios');
const { parseCurrency, formatCurrency, addCurrencies } = require('./currency');

async function calculateOrderTotal(itemIds, shippingCostStr = '$0.00') {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = Array.isArray(response.data) ? response.data : [];

    const selected = posts.filter((post) => itemIds.includes(post.id));
    const itemsSubtotal = selected.reduce((sum, item) => {
        const price = typeof item.price === 'number' ? item.price : item.id * 10;
        return addCurrencies(sum, formatCurrency(price));
    }, '$0.00');

    return addCurrencies(itemsSubtotal, shippingCostStr);
}

function applyCouponToAmount(amountStr, discountPercent) {
    const numeric = parseCurrency(amountStr);
    const discounted = numeric * (1 - discountPercent / 100);
    return formatCurrency(discounted);
}

module.exports = { calculateOrderTotal, applyCouponToAmount };