
window.setCurrency = function (price, currency) {
    return price .toLocaleString('sk-SK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: currency,
        style: 'currency'
    });
}