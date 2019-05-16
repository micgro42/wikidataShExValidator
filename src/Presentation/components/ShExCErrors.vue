<template>
    <div
            v-if="error.message"
            class="notification is-danger"
    >
        <b>Line {{error.lineNo}}:</b>
        <pre>{{error.message}}</pre>
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
