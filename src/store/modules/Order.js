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

        setOrder({ commit, dispatch }, data) {

            data.budgetPrice = setCurrency(data.budget, data.currency);

            if( data.discount )
            {
                // RAW - price in numer format
                data.rawDiscountValue = (data.budget / 100 * data.discount);
                data.rawDiscountPrice = data.budget - data.rawDiscountValue;

                data.discountValue = setCurrency(data.rawDiscountPrice, data.currency);
                data.discountPrice = setCurrency(data.rawDiscountPrice, data.currency);
            }
            else
            {
                data.rawDiscountValue = 0;
                data.rawDiscountPrice = data.budget;
                data.discountValue = 0;
                data.discountPrice = setCurrency(data.budget, data.currency);
            }

            // VAT
            data.rawDiscountPricePlusVat = data.currency != 'CZK'
                ? data.rawDiscountPrice + (data.rawDiscountPrice / 100 * 20)
                : data.rawDiscountPrice;

            data.discountPricePlusVat = setCurrency(data.rawDiscountPricePlusVat, data.currency);

            commit('SET_ORDER', data);
        },
    },


    getters: {
        getOrder(state) {
            return state.order;
        }
    }

}