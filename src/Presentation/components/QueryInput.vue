<template>
  <div class="field">
    <label for="query" class="label">SPARQL Query</label>
    <p class="help">Enter query for Items to check.</p>
    <div class="control">
      <textarea
        id="query"
        v-model="Query"
        rows="10"
        class="textarea"
        spellcheck="false"
        autocomplete="off"
        data-gramm="false"
        autocapitalize="none"
        cols="72"
        name="query"
        placeholder="#Cats
SELECT ?item
WHERE
{
  ?item wdt:P31 wd:Q146.
}"
      ></textarea>
    </div>
    <div class="control">
      <button class="button is-primary" @click="handleQueryChange">
        Fetch Entites
      </button>
    </div>
    <div v-if="getQueryError" class="notification is-danger">
      <pre>{{ getQueryError }}</pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'QueryInput',
  data() {
    return { Query: '' };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      parseStatus: 'getShExCStatus',
      getQueryError: 'getQueryError',
    }),
  },
  methods: {
    handleQueryChange() {
      this.updateQueryInStore(this.Query);
    },
    ...mapActions({
      updateQueryInStore: 'setQuery',
    }),
  },
};
</script>

<style scoped></style>
