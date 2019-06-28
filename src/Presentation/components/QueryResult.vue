<template>
  <div>
    <ul class="list">
      <EntityListItem
        v-for="entity in entities"
        :key="entity.url"
        :status="entity.status"
        :url="entity.url"
        :error="entity.error"
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
