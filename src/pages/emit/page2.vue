<template>

</template>

<script>
    export default {
        name: "page2",
        mounted(){
            let that = this;

            let data = that.helper.get_data('page-data');
            that.helper.log(data);

        },
    }
</script>

<style scoped>

</style>
