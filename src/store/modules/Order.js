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
            console.log(data);
            if( data.discount )
            {
                data.rawDiscountValue = (data.budget / 100 * data.discount);
                data.rawDiscountPrice = data.budget - data.rawDiscountValue;

                data.discountValue = data.rawDiscountPrice.toLocaleString('sk-SK', {
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
            }
            else
            {
                data.rawDiscountValue = 0;
                data.rawDiscountPrice = data.budget;
                data.discountValue = 0;
                data.discountPrice = data.budget.toLocaleString('sk-SK', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    currency: data.currency,
                    style: 'currency'
                });
            }

            context.commit('SET_ORDER', data);
        },
    },


    getters: {

    }

}