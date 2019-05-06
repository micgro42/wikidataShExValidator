<template>
    <div v-if="error.message">
        <pre>{{error.message}}</pre>
        <span>line: {{error.lineNo}}</span>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    //
    export default {
        name: 'ShExCErrors',
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters({
                error: 'getShExCParseError',
            }),
        },
    };
</script>

<style scoped>

</style>
