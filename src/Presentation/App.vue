<template>
    <section class="section" id="app">
        <div class="container">
            <ShExCInput/>
            <QueryWrapper/>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ShExCInput from './components/ShExCInput.vue';
    import QueryWrapper from './components/QueryWrapper.vue';

    @Component({
        components: {
            QueryWrapper,
            ShExCInput,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">

</style>
