<template>
	<div class="order container is-fluid">
		<div v-if="id && transactionDetails" class="columns">
			<div class="column is-6">
				<div class="card summary-sidebar middle p-4">
					<div class="summary-sidebar-card-content">
						<div v-if="success" class="notification is-success">
							<p class="header-summary-title">Platba prebehla úspešne</p>
							<p class="header-summary-title">Ďakujeme!</p>
						</div>
						<div v-if="!success" class="notification is-danger">
							<p class="header-summary-title">Platba neprebehla</p>
							<p v-if="errors" v-for="error, index in errors" :key="index" class="header-summary-title">{{error}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-6">
				<div class="card summary-sidebar middle p-4">
					<div class="summary-sidebar-card-content">
						<section>
							<h5>Transaction</h5>
							<table class="table is-bordered is-striped is-fullwidth">
								<tbody>
								<tr>
									<td>id</td>
									<td>{{transactionDetails.id}}</td>
								</tr>
								<tr>
									<td>type</td>
									<td>{{transactionDetails.type}}</td>
								</tr>
								<tr>
									<td>amount</td>
									<td>{{transactionDetails.amount}}</td>
								</tr>
								<tr>
									<td>status</td>
									<td>{{transactionDetails.status}}</td>
								</tr>
								<tr>
									<td>created_at</td>
									<td>{{transactionDetails.createdAt}}</td>
								</tr>
								<tr>
									<td>updated_at</td>
									<td>{{transactionDetails.updatedAt}}</td>
								</tr>
								</tbody>
							</table>
						</section>

						<section v-if="transactionDetails.creditCard">
							<h5>Card detail</h5>
							<table class="table is-bordered is-striped is-fullwidth">
								<tbody>
								<tr>
									<td>token</td>
									<td>{{transactionDetails.creditCard.token}}</td>
								</tr>
								<tr>
									<td>bin</td>
									<td>{{transactionDetails.creditCard.bin}}</td>
								</tr>
								<tr>
									<td>last_4</td>
									<td>{{transactionDetails.creditCard.last4}}</td>
								</tr>
								<tr>
									<td>card_type</td>
									<td>{{transactionDetails.creditCard.cardType}}</td>
								</tr>
								<tr>
									<td>expiration_date</td>
									<td>{{transactionDetails.creditCard.expirationDate}}</td>
								</tr>
								<tr>
									<td>cardholder_name</td>
									<td>{{transactionDetails.creditCard.cardholderName}}</td>
								</tr>
								<tr>
									<td>customer_location</td>
									<td>{{transactionDetails.creditCard.customerLocation}}</td>
								</tr>
								</tbody>
							</table>
						</section>
						<section v-if="transactionDetails.customerDetails && transactionDetails.customerDetails.id">
							<h5>Customer Details</h5>
							<table class="table is-bordered is-striped is-fullwidth">
								<tbody>
									<tr>
										<td>id</td>
										<td>{{transactionDetails.customerDetails.id}}</td>
									</tr>
									<tr>
										<td>first_name</td>
										<td>{{transactionDetails.customerDetails.firstName}}</td>
									</tr>
									<tr>
										<td>last_name</td>
										<td>{{transactionDetails.customerDetails.lastName}}</td>
									</tr>
									<tr>
										<td>email</td>
										<td>{{transactionDetails.customerDetails.email}}</td>
									</tr>
									<tr>
										<td>company</td>
										<td>{{transactionDetails.customerDetails.company}}</td>
									</tr>
									<tr>
										<td>website</td>
										<td>{{transactionDetails.customerDetails.website}}</td>
									</tr>
									<tr>
										<td>phone</td>
										<td>{{transactionDetails.customerDetails.phone}}</td>
									</tr>
									<tr>
										<td>fax</td>
										<td>{{transactionDetails.customerDetails.fax}}</td>
									</tr>
								</tbody>
							</table>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import ApiRoutes from '@/router/ApiRoutes'

export default {

	name: 'TransactionDone',

	props: [
		'id'
	],

	data() {
		return {
			transactionDetails: null,
			success: false,
			errors: null,
		}
	},

	created() {
		if( this.id )
		{
			axios.get(ApiRoutes.PAYMENT_TRANSACTION_URL + this.id)
				.then(response => {
					this.success = response.data?.success ? true : false;
					if( response.data?.errors ) this.errors = response.data.errors;
					this.transactionDetails = response.data.transactionDetails;
					console.log('done response');
					console.log(response);
				})
				.catch(error => {
					this.success = false;
				});
		}
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
