<template>
    <div class="">
        <div id="dropin-container"></div>
        <button id="submit-button" class="button is-success">Zaplatiť</button>
        <input v-model="customAmount" type="text" id="customAmount" class="input mt-2" placeholder="amount">
    </div>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'
import ApiRoutes from '@/router/ApiRoutes'


export default {

    name: 'DropInForm',

    data() {
        return {
            customAmount: 10,
        }
    },

    methods: {
        ...mapGetters( 'order', [ 'getOrder' ] ),
        ...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient', 'getDropIn' ] ),
        ...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient', 'setDropIn' ] ),
    },

    mounted() {
        let brainTreeDropIn = this.getDropIn();
        let order = this.getOrder();
        let thisComponent = this;

        let button = document.querySelector('#submit-button');

        brainTreeDropIn.create({
            authorization: this.getToken(),
            selector: '#dropin-container',
            vaultManager: true,
            locale: 'sk_SK',
            /*paypal: {
                flow: 'checkout',
                amount: order.rawDiscountPricePlusVat,
                currency: order.currency
            }*/
        }, (err, instance) => {
            if (err) {
                alert('Nepodarilo sa aktivovať platovnú bránu');
                console.log(err);
                return;
            }

            // Test cards numbers
            // https://developer.paypal.com/braintree/docs/reference/general/testing#card-numbers-with-type-indicators
            button.addEventListener('click', () => {
                instance.requestPaymentMethod(function (err, payload) {
                    if( err )
                    {
                        console.log(err);
                        return;
                    }

                    // Submit payload.nonce to your server
                    console.log(payload);
                    axios.post(ApiRoutes.PAYMENT_CHECKOUT_URL, {
                            //amount: order.rawDiscountPricePlusVat,
                            amount: thisComponent.customAmount,
                            payment_method_nonce: payload.nonce,
                        })
                        .then( response => {
                            console.log(response);
                            if( response.data?.id ) thisComponent.$router.push({name: 'TransactionDone', params: {id: response.data.id}});
                            else if( response.data?.errors ) alert(response.data.errors.join("\n"));
                            else thisComponent.$router.push({name: 'TransactionDone'});
                        })
                        .catch( error => {
                            thisComponent.$router.push({name: 'TransactionDone'});
                        });
                });
            })
        });
    },

}
</script>


<style scope lang="scss">
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>