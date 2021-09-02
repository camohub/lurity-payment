<template>
  <div class="container is-fluid">
    <h1>Payment method</h1>
	<div class="columns">
		<div class="column is-10">
			<div class="card"><CardForm /></div>
		</div>
		<div v-if="order" class="column is-2">
			<div class="card summary-sidebar middle">
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
  </div>
</template>


<script>

import CardForm from '@/components/payment/CardForm'
import { mapGetters, mapActions } from 'vuex'


export default {
	name: 'Order',

	data() {
		return {

		}
	},

	methods: {
		...mapGetters( 'order', [ 'getOrder' ] ),
		...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient' ] ),
		...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient' ] ),
	},

	components: {
		CardForm
	},

	created() {
		this.order = this.getOrder();
		this.setToken('777777777777777777777');
		this.setClient();
		axios.get('API_TOKEN_URL')
			.then(response => {
				//this.$store.dispatch('brainTreeGateway/setToken', response.data.token);
				this.setToken(response.data.token);
                this.setClient();
			})
			.catch( error => {
				console.log('Nepodarilo sa získať token pre platobnú bránu.');
			});
	}

}
</script>

@import "@/assets/panels.scss";

<style lang="scss" scoped>

.column.is-2 {
	display: table;
	.middle {
		padding: 14px;
		display: table-cell;
		vertical-align: middle;
	}
}



</style>