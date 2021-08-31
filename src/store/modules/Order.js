export default {

	namespaced: true,


	state: () => ({
		order: null
	}),


	mutations: {

		SET_ORDER(state, data) {
			state.order = data;
		},
	},


	actions: {

		setOrder(context, data) {
		    data.rawDiscount = (data.budget / 100 * data.discount);
            data.rawDiscountPrice = data.budget - data.rawDiscount;

            data.discount = data.rawDiscountPrice.toLocaleString('sk-SK', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: data.currency,
                style: 'currency'
            });
            data.discountPrice = data.rawDiscountPrice.toLocaleString('sk-SK', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: data.currency,
                style: 'currency'
            });
			context.commit('SET_ORDER', data);
		},
	},


	getters: {

	}

}