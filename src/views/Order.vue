<template>
  <div class="order">
    <div class="columns">
        <div class="column is-10">
			first col
        </div>
        <div v-if="order && order.budget" class="column is-2">
			<div class="card summary-sidebar">
				<div class="summary-sidebar-card-content">
					<h2>Sumár</h2>
					<div class="header-summary-item-text has-border">
						<p class="header-summary-title">Celkom bez DPH</p>
						<p class="header-summary-value">{{order.budgetPrice}}</p>
					</div>
					<div class="header-summary-item-text has-border">
						<p v-if="order.discountPrice" class="header-summary-title is-danger">Zľava {{order.discount}}%</p>
						<p v-if="order.discountPrice" class="header-summary-value">{{order.discountValue}}</p>
					</div>
					<div class="header-summary-title has-text-darkblue has-text-weight-bold">
						<p v-if="order.discountPrice" class="header-summary-title">Cena po zľave bez DPH</p>
						<p v-if="order.discountPrice" class="header-summary-title">{{order.discountPrice}}</p>
					</div>
					<div class="header-summary-item-text has-border">
						<p class="header-summary-title has-text-darkblue has-text-weight-bold"> K úhrade </p>
						<p class="header-summary-value has-text-primary is-size-4">{{order.discountPrice}}</p>
					</div>
				</div>
			</div>
		</div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Order',

	computed: {
        order: function() {
			return this.$store.state.order.order;
		}
	},

	created() {
        axios.get('https://portal.lurity.com/api/v1/campaigns/7028f519b6a9fd42')
            .then( response => {
                console.log(response)
                this.$store.dispatch('order/setOrder', response.data)
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

.bb-dashed {
	border-bottom: 1px dashed #778699;
}
</style>
