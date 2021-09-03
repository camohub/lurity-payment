<template>
  <div class="container is-fluid">
    <h1>Payment method</h1>
    <div class="columns">
        <div class="column is-10">
            <div class="card middle p-4">
				<div v-if="hasToken" >
					<DropInForm />
				</div>
			</div>
        </div>
        <div v-if="order" class="column is-2 has-text-centered">
            <div class="card summary-sidebar middle p-4">
                <div class="summary-sidebar-card-content">
                    <h2>Sumár</h2>
                    <div class="header-summary-item-text has-border">
                        <p class="header-summary-title">Celkom bez DPH</p>
                        <p class="header-summary-value">{{order.budgetPrice}}</p>
                    </div>
                    <div v-if="order.discount" class="header-summary-item-text has-border">
                        <p class="header-summary-title is-danger">Zľava {{order.discount}}%</p>
                        <p class="header-summary-value">{{order.discountValue}}</p>
                    </div>
                    <div v-if="order.discount" class="header-summary-title has-text-darkblue has-text-weight-bold">
                        <p class="header-summary-title">Cena po zľave bez DPH</p>
                        <p class="header-summary-title">{{order.discountPrice}}</p>
                    </div>
                    <div class="header-summary-item-text has-border">
                        <p class="header-summary-title has-text-darkblue has-text-weight-bold"> K úhrade </p>
                        <p class="header-summary-value has-text-primary is-size-4">{{order.discountPricePlusVat}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<div class="columns">
		<div class="column is-4">
			378282246310005	American Express <br>
			371449635398431	American Express <br>
			36259600000004	Diners Club* <br>
			6011000991300009	Discover <br>
			3530111333300000	JCB <br>
			6304000000000000	Maestro <br>
			5555555555554444	Mastercard <br>
			2223000048400011	Mastercard <br>
			4111111111111111	Visa <br>
			4005519200000004	Visa <br>
			4009348888881881	Visa <br>
			4012000033330026	Visa <br>
			4012000077777777	Visa <br>
			4012888888881881	Visa <br>
			4217651111111119	Visa <br>
			4500600000000061	Visa <br>
		</div>
		<div class="col is-4">
			0.01 - 1999.99	Authorized	Settled<br>
			2000.00 - 2999.99	Processor Declined with a processor response equal to the amount	n/a<br>
			3000.00 - 3000.99	Failed with a 3000 processor response	n/a<br>
			3001.00 - 4000.99	Authorized	Settled<br>
			4001.00 - 4001.99	Authorized	Settlement Declined on certain transaction types with a processor response equal to the amount; Settled on all others<br>
			4002.00 - 4002.99	Authorized	Settlement Pending on PayPal transactions with a processor response equal to the amount; Settled on all others<br>
			4003.00 - 5000.99	Authorized	Settlement Declined on certain transaction types with a processor response equal to the amount; Settled on all others<br>
			5001.00	Gateway Rejected with a reason of Application Incomplete	n/a<br>
			5001.01	Processor Declined on PayPal transactions in the Mocked PayPal flow with a 2038 processor response. Authorized on all others	n/a on PayPal transactions; Settled on all others<br>
			5001.02	Authorized	Processor Unavailable on certain transaction types with a processor response of 3000; Settled on all others<br>
			5002.00 and up	Authorized	Settled<br>
		</div>
	</div>
  </div>
</template>


<script>

import CardForm from '@/components/payment/CardForm'
import DropInForm from '@/components/payment/DropInForm'
import { mapGetters, mapActions } from 'vuex'
import ApiRoutes from '@/router/ApiRoutes'


export default {
    name: 'PaymentMethod',

    data() {
        return {
            hasToken: false,
        }
    },

    methods: {
        ...mapGetters( 'order', [ 'getOrder' ] ),
        ...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient', 'getDropIn' ] ),
        ...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient', 'setDropIn' ] ),

        getToken() {
            return axios.get(ApiRoutes.PAYMENT_CLIENT_TOKEN_URL)
                .then( response => {
                    if( response.data.clientToken )
                    {
                        this.setToken(response.data.clientToken);
                        this.hasToken = true;
                    }
                    else
                    {
                        console.log('Client token is missing.', response);
                    }
                })
                .catch( error => {
                    console.log(error);
                });
        }
    },

    created() {
        this.order = this.getOrder();
        this.getToken();
        this.setDropIn();
    },

    components: {
        CardForm, DropInForm
    },

}
</script>

@import "@/assets/panels.scss";

<style lang="scss" scoped>

.column.is-2, .column.is-10 {
    display: table;
    .middle {
        padding: 14px;
        display: table-cell;
        vertical-align: middle;
    }
}



</style>