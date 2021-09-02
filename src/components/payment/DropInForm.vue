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
            ...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient', 'getDropIn' ] ),
            ...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient', 'setDropIn' ] ),
        },

        mounted() {
            let brainTreeDropIn = this.getDropIn();

            let button = document.querySelector('#submit-button');

            console.log('brainTreeDropIn');
            console.log(brainTreeDropIn);

            brainTreeDropIn.create({
                authorization: this.getToken(),
                selector: '#dropin-container'
            }, function (err, instance) {
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (err, payload) {
                        // Submit payload.nonce to your server
						if( error ) alert('Nepodarilo sa aktivovať platobnú bránu');
						axios.post('http://localhost:8000/api/lurity-gatewayNonce', payload)
							.then( response => {
								if( response.data?.message ) alert(response.data.message);
								else if ( response.data?.error ) alert(response.data.error);
								else console.log(response);
							})
							.catch( error => {
								console.log(error);
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