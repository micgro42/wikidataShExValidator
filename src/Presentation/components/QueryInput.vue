<template>
    <div>
        <label
                for="query"
                class="label"
        >SPARQL Query</label>
        <textarea
                rows="10"
                class="textarea"
                cols="72"
                name="query"
                id="query"
                v-on:change="handleQueryChange"
        ></textarea>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'QueryInput',
        methods: {
            handleQueryChange(event) {
                this.updateQueryInStore(event.target.value);
            },
            ...mapActions({
                updateQueryInStore: 'setQuery',
            }),
        },
    };
    // https://query.wikidata.org/sparql?query=
</script>

<style scoped>

</style>
