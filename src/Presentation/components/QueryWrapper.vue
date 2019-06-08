<template>
  <div>
    <QueryInput />
    <QueryResult v-if="numEntities > 0" />
  </div>
</template>

<script>
import QueryInput from './QueryInput';
import QueryResult from './QueryResult';
import { mapGetters } from 'vuex';

export default {
  name: 'QueryWrapper',
  components: { QueryResult, QueryInput },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      numEntities: 'getQueryEntitiesLength',
    }),
  },
};
</script>

<style scoped></style>
