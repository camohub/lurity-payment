<template>
    <form action="/" method="post" id="cardForm" ref="cardForm">
        <label class="hosted-fields--label" for="card-number">Card Number</label>
        <div id="card-number" class="hosted-field"></div>

        <label class="hosted-fields--label" for="expiration-date">Expiration Date</label>
        <div id="expiration-date" class="hosted-field"></div>

        <label class="hosted-fields--label" for="cvv">CVV</label>
        <div id="cvv" class="hosted-field"></div>

        <label class="hosted-fields--label" for="postal-code">Postal Code</label>
        <div id="postal-code" class="hosted-field"></div>

        <div class="button-container">
            <input type="submit" class="button is-success" value="Purchase" id="submit"/>
        </div>
    </form>
</template>


<script>

    import { mapGetters, mapActions } from 'vuex'


    export default {
        name: 'Order',

        data() {
            return {

            }
        },

        methods: {
            ...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient' ] ),
            ...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient' ] ),

            // https://developer.paypal.com/braintree/docs/guides/hosted-fields/overview
			// https://developer.paypal.com/braintree/docs/guides/hosted-fields/setup-and-integration
            setCardFields() {
                let form = this.$refs.cardForm;
                let client = this.getClient();
                client.create({
                    authorization: this.getToken(),
                })
                .then(function (clientInstance) {
                    let hostedFields = this.getHostedFields();
                    hostedFields.create({
                        client: clientInstance,
                        fields: {
                            number: {
                                selector: '#card-number',
                                placeholder: '4111 1111 1111 1111'
                            },
                            cvv: {
                                selector: '#cvv',
                                placeholder: '123'
                            },
                            expirationDate: {
                                selector: '#expiration-date',
                                placeholder: 'MM/YYYY'
                            },
                            postalCode: {
                                selector: '#postal-code',
                                placeholder: '11111'
                            }
                        }
                    });
                }, function (err, hostedFieldsInstance) {
                    var tokenize = function (event) {
                        event.preventDefault();

                        hostedFieldsInstance.tokenize(function (err, payload) {
                            if (err) {
                                alert('Something went wrong. Check your card details and try again.');
                                return;
                            }

                            alert('Submit your nonce (' + payload.nonce + ') to your server here!');
                        });
                    };

                    form.addEventListener('submit', tokenize, false);
                })
                .catch(error => {
                    console.log('Nepodarilo sa aktivovať platbu kartou.');
                });
            }
        },

        mounted() {
            this.setCardFields();
        },

    }
</script>


<style scope lang="scss">
    .hosted-field {
        height: 50px;
        box-sizing: border-box;
        width: 100%;
        padding: 12px;
        display: inline-block;
        box-shadow: none;
        font-weight: 600;
        font-size: 14px;
        border-radius: 6px;
        border: 1px solid #dddddd;
        line-height: 20px;
        background: #fcfcfc;
        margin-bottom: 12px;
        background: linear-gradient(to right, white 50%, #fcfcfc 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: all 300ms ease-in-out;
    }

    .hosted-fields--label {
        font-family: courier, monospace;
        text-transform: uppercase;
        font-size: 14px;
        display: block;
        margin-bottom: 6px;
    }

    .button-container {
        display: block;
        text-align: center;
    }

    .button {
        cursor: pointer;
        font-weight: 500;
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

    .braintree-hosted-fields-focused {
        border: 1px solid #64d18a;
        border-radius: 1px;
        background-position: left bottom;
    }

    .braintree-hosted-fields-invalid {
        border: 1px solid #ed574a;
    }

    .braintree-hosted-fields-valid {
    }

    #cardForm {
        max-width: 50.75em;
        margin: 0 auto;
        padding: 1.875em;
    }
</style>