<template>
  <div class="about">
    <h1>Payment method</h1>

  </div>
</template>


<script>

var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');

client.create({
	authorization: 'CLIENT_AUTHORIZATION'
}).then(function (clientInstance) {
	hostedFields.create(/* ... */);
});


export default {
	name: 'Order',

}
</script>

