<template>
  <li class="list-item">
    <a :href="url" class="is-success">{{ url }}</a>
    <span v-if="isConformant" class="tag is-success">{{ status }}</span>
    <span v-if="hasErrors" class="tag is-danger">{{ status }}</span>
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
