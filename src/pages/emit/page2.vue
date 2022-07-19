<template>

</template>

<script>
    export default {
        name: "page2",
        mounted(){
            let that = this;

            let data = that.common.get_data('page-data');
            that.common.log(data);

        },
    }
</script>

<style scoped>

</style>
