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
  props: {
    url: {
      type: String,
      required: true,
    },
    status: ValidationStatus,
    error: {
      type: String,
      default: '',
    },
  },
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
