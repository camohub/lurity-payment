<template>
	<div id="app">
		<div id="nav" class="has-text-centered">
			<router-link :to="{name: 'Order'}">Order</router-link> |
			<router-link :to="{name: 'PaymentMethod'}">Payment method</router-link>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">

html, body {
	height: 100%;
	min-height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	min-height: 100%;
	background: #F4F7FC;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
		  color: #42b983;
		}
	}
}
</style>
