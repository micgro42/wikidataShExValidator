<template>
  <li class="list-item">
    <a class="is-success" :href="this.url">{{ this.url }}</a>
    <span class="tag is-success" v-if="isConformant">{{ this.status }}</span>
    <span class="tag is-danger" v-if="hasErrors">{{ this.status }}</span>
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
