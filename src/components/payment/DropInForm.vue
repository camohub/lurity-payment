<template>
    <div class="">
        <div id="dropin-container"></div>
        <button id="submit-button" class="button is-success">Zaplatiť</button>
    </div>
</template>


<script>

    import { mapGetters, mapActions } from 'vuex'


    export default {
        name: 'DropInForm',

        data() {
            return {

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

            let button = document.querySelector('#submit-button');

            brainTreeDropIn.create({
                authorization: this.getToken(),
                selector: '#dropin-container',
                vaultManager: true,
                /*paypal: {
                    flow: 'checkout',
                    amount: order.rawDiscountPricePlusVat,
                    currency: order.currency
                }*/
            }, function (err, instance) {
                if (err) {
                    alert('Nepodarilo sa aktivovať platovnú bránu');
                    console.log(err);
                    return;
                }

                /*brainTreeDropIn.dataCollector.create({
                    client: clientInstance
                }, function (err, dataCollectorInstance) {
                    if (err) {
                        // Handle error in creation of data collector
                        return;
                    }
                    // At this point, you should access the dataCollectorInstance.deviceData value and provide it
                    // to your server, e.g. by injecting it into your form as a hidden input.
                    var deviceData = dataCollectorInstance.deviceData;
                });*/

                // Test cards numbers
                // https://developer.paypal.com/braintree/docs/reference/general/testing#card-numbers-with-type-indicators
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (err, payload) {
                        if( err )
                        {
                            alert('Nepodarilo sa aktivovať platobnú bránu');
                            console.log(err);
                            return;
                        }

                        // Submit payload.nonce to your server
                        console.log(payload);
                        axios.post('http://localhost:8000/api/lurity-checkout', {
                            amount: order.rawDiscountPricePlusVat,
                            payment_method_nonce: payload.nonce,
                        })
                            .then( response => {
                                console.log(response);
                                if( response.data?.message )
                                {
                                    alert(response.data.message);
                                }
                                else if ( response.data?.errors )
                                {
                                    console.log(response.data.errors);
                                    alert(response.data.errors.join("\n"));
                                }
                                else
                                {
                                    console.log(response);
                                }
                            })
                            .catch( error => {
                                console.log(error);
                                alert('Počas transakcie došlo k chybe.');
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