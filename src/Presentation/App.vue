<template>
    <section class="section" id="app">
        <div class="container">
            <ShExC/>
            <QueryWrapper/>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ShExC from './components/ShExC.vue';
    import QueryWrapper from './components/QueryWrapper.vue';

    @Component({
        components: {
            QueryWrapper,
            ShExC,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">

</style>
