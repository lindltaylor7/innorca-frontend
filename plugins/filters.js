import Vue from 'vue';

Vue.filter('currency_format', function (value, currency = 'USD') {
	const safeNumber = Number(value);

	const isDollar = currency === 'USD';

	const localeCurrency = isDollar ? 'en-PE' : 'es-PE';

	const options = {
		style: 'currency',
		currency: isDollar ? 'USD' : 'PEN'
	};

	return safeNumber.toLocaleString(localeCurrency, options);
})
