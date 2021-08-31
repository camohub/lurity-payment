<template>
  <div class="order">
    <div class="columns is-mobile is-variable is-1-mobile is-2-tablet">
        <div class="column is-three-quarters-mobile is-three-quarters-tablet is-three-quarters-desctop is-three-quarters-widescreen is-three-quarters-fullhd">
            <div>First column</div>
        </div>
        <div class="column">
            <div>Second column</div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Order',

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

</style>
