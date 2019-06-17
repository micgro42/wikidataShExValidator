<template>
  <div class="field">
    <SchemaIdInput />
    <ShExCView></ShExCView>
    <div v-if="parseStatus === 'INVALID'">
      <ShExCErrors />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SchemaIdInput from './SchemaIdInput';
import ShExCView from './ShExCView';
import ShExCErrors from './ShExCErrors';
export default {
  name: 'SchemaSection',
  components: { SchemaIdInput, ShExCView, ShExCErrors },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      parseStatus: 'getShExCStatus',
    }),
  },
};
</script>

<style scoped></style>
