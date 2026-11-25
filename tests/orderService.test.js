// tests/orderService.test.js
const axios = require('axios');
const { calculateOrderTotal, applyCouponToAmount } = require('../src/orderService');

jest.mock('axios');

describe('orderService: інтеграція з currency та API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockResolvedValue({
            data: [
                { id: 1, title: 'Позиція 1', price: 25 },
                { id: 2, title: 'Позиція 2', price: 15.5 },
                { id: 3, title: 'Позиція 3', price: 40 }
            ]
        });
    });

    test('Інтеграційний тест 1: розрахунок суми обраних позицій з API + доставка через currency', async () => {
        const total = await calculateOrderTotal([1, 2], '$9.50');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(total).toBe('$50.00');
    });

    test('Інтеграційний тест 2: розрахунок замовлення з API та застосування купона знижки', async () => {
        const subtotal = await calculateOrderTotal([1, 3], '$0.00');
        const finalPrice = applyCouponToAmount(subtotal, 20);
        expect(subtotal).toBe('$65.00');
        expect(finalPrice).toBe('$52.00');
    });
});