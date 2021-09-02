<template>
  <div class="container is-fluid">
    <h1>Payment method</h1>
    <div class="columns">
        <div class="column is-10">
            <div v-if="hasTokenAndDropIn" class="card p-10"><DropInForm /></div>
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
import DropInForm from '@/components/payment/DropInForm'
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'Order',

    data() {
        return {
            hasTokenAndDropIn: false,
        }
    },

    methods: {
        ...mapGetters( 'order', [ 'getOrder' ] ),
        ...mapGetters( 'brainTreeGateway', [ 'getToken', 'getClient', 'getDropIn' ] ),
        ...mapActions( 'brainTreeGateway', [ 'setToken', 'setClient', 'setDropIn' ] ),

        getTokenAndSetDropIn() {
            return axios.get('http://localhost:8000/api/lurity-gateway-client-token')
                .then( response => {
                    if( response.data.clientToken )
                    {
                        this.setToken(response.data.clientToken);
                        this.setDropIn();
                        this.hasTokenAndDropIn = true;
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
        this.getTokenAndSetDropIn();
    },

    components: {
        CardForm, DropInForm
    },

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