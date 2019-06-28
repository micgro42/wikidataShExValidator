<template>
  <div>
    <ul class="list">
      <EntityListItem
        v-for="entity in entities"
        v-bind:key="entity.url"
        v-bind:status="entity.status"
        v-bind:url="entity.url"
        v-bind:error="entity.error"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EntityListItem from './EntityListItem';

export default {
  name: 'QueryResult',
  components: { EntityListItem },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      entities: 'getQueryEntities',
    }),
  },
};
</script>

<style scoped></style>
