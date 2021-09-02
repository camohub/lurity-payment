import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../views/Order.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Order',
        component: Order
    },
    {
        path: '/payment-method',
        name: 'PaymentMethod',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PaymentMethod.vue')
    },
    {
        path: '/transaction-done/:id?',
        name: 'TransactionDone',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/TransactionDone.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
