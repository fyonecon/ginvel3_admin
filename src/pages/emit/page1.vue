<template>
    <div :class="[li_state, li_state1]">
        {{title_class}}
        <li :class="title_class" v-for="item in items">
            {{item.title}}
        </li>
    </div>
</template>

<script>
    export default {
        name: "page1",
        data(){
            let that = this;
            return {
                li_state: 'show',
                li_state1: 'show1',
                title_class: 'red',
                items: [
                    { title: '（暂无数据）' },
                ],

            };
        },
        mounted(){
            let that = this;

            let data = that.common.set_data('page-data', 'hello');
            that.common.log(data);

            setTimeout(function () {
                that.li_state = 'hide';
            }, 3000);

        },
    }
</script>

<style scoped>

</style>
