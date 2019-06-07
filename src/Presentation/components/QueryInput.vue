<template>
    <div class="field">
        <label
                for="query"
                class="label"
        >SPARQL Query</label>
        <p class="help">Enter query for Items to check.</p>
        <div class="control">
        <textarea
                rows="10"
                class="textarea"
                spellcheck="false"
                autocomplete="off"
                data-gramm="false"
                autocapitalize="none"
                cols="72"
                name="query"
                id="query"
                v-model="Query"
        ></textarea>
        </div>
        <div class="control">
            <button
                class="button is-primary"
                v-on:click="handleQueryChange"
            >
                Fetch Entites
            </button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'QueryInput',
        data() {
            return { Query: '' };
        },
        methods: {
            handleQueryChange(event) {
                this.updateQueryInStore(this.Query);
            },
            ...mapActions({
                updateQueryInStore: 'setQuery',
            }),
        },
    };
</script>

<style scoped>

</style>
