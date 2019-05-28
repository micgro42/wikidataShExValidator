<template>
    <div class="field">
        <label
                for="query"
                class="label"
        >SPARQL Query</label>
        <p class="help">Enter query for Items to check. Query is executed after textarea has been changed and
            de-selected</p>
        <div class="control">
        <textarea
                rows="10"
                class="textarea"
                cols="72"
                name="query"
                id="query"
                v-on:change="handleQueryChange"
        ></textarea>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

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
