<template>
  <div class="about">
    <h1>Payment method</h1>
	<div class="columns">
		<div class="column is-10">
			<CardForm />
		</div>
		<div class="column is-2"></div>
	</div>
	<button id="submit-button">submit</button>
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
		...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient' ] ),
		...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient' ] ),
	},

	components: {
		CardForm
	},

	created() {
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