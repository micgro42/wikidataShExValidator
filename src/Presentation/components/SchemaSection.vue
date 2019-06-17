<template>
  <div class="field">
    <SchemaIdInput />
    <div v-if="parseStatus === 'INVALID'">
      <ShExCErrors />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SchemaIdInput from './SchemaIdInput';
import ShExCErrors from './ShExCErrors';
export default {
  name: 'SchemaSection',
  components: { SchemaIdInput, ShExCErrors },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      parseStatus: 'getShExCStatus',
    }),
  },
};
</script>

<style scoped></style>
