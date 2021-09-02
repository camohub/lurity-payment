<template>
  <div class="order container is-fluid">
    <div class="columns">
        <div class="column is-10 has-text-centered">
			<div class="card middle">Order detail...</div>
        </div>
        <div v-if="order && order.budget" class="column is-2 has-text-centered">
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
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import ApiRoutes from '@/router/ApiRoutes'

export default {
    name: 'Order',

	computed: {
        order: function() {
			return this.$store.state.order.order;
		}
	},

	methods: {
		...mapActions('order', ['setOrder']),
	},

	created() {
        axios.get(ApiRoutes.PAYMENT_CAMPAIGN_URL)
            .then( response => {
                this.setOrder(response.data);
            })
            .catch( error => {
                alert('API request error')
                console.log(error)
            });
    }

}
</script>

<style lang="scss" scoped>

@import "@/assets/panels.scss";

.column {
	display: table;
	.middle {
		padding: 14px;
		display: table-cell;
		vertical-align: middle;
	}
}

</style>
