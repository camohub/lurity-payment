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

            data.budgetPrice = data.budget.toLocaleString('sk-SK', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: data.currency,
                style: 'currency'
            });

            if( data.discount )
            {
                // RAW - price in numer format
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

            // VAT
            data.discountPricePlusVat = data.currency != 'CZK'
                ? data.rawDiscountPrice + (data.rawDiscountPrice / 100 * 20)
                : data.rawDiscountPrice;

            data.discountPricePlusVat = data.discountPricePlusVat.toLocaleString('sk-SK', {
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