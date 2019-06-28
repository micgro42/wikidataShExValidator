<template>
  <li class="list-item">
    <a :href="this.url" class="is-success">{{ this.url }}</a>
    <span v-if="isConformant" class="tag is-success">{{ this.status }}</span>
    <span v-if="hasErrors" class="tag is-danger">{{ this.status }}</span>
    <pre v-if="hasErrors">{{ error }}</pre>
  </li>
</template>

<script>
import { ValidationStatus } from '../../Store/ValidationStatus';

export default {
  name: 'EntityListItem',
  props: ['url', 'status', 'error'],
  computed: {
    hasErrors() {
      return this.status === ValidationStatus.Nonconformant;
    },
    isConformant() {
      return this.status === ValidationStatus.Conformant;
    },
  },
};
</script>

<style scoped></style>
