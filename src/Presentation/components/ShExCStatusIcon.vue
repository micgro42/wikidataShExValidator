<template>
  <span :class="wrapperClass">
    <i :class="iconClass"></i>
  </span>
</template>

<script>
import { ShExCStatus } from '../../Store/ShExCStatus';

export default {
  name: 'ShExCStatusIcon',
  props: ['status'],
  computed: {
    wrapperClass() {
      const classes = ['icon', 'is-small', 'is-right'];
      switch (this.$store.getters.getShExCStatus) {
        case ShExCStatus.invalid:
        case ShExCStatus.loadingError:
          classes.push('has-text-danger');
          break;
        case ShExCStatus.valid:
          classes.push('has-text-success');
          break;
        default:
          throw new Error(
            'Invalid status for icon: ' + this.$store.getters.getShExCStatus,
          );
      }

      return classes.join(' ');
    },
    iconClass() {
      const classes = ['fas'];
      switch (this.$store.getters.getShExCStatus) {
        case ShExCStatus.invalid:
        case ShExCStatus.loadingError:
          classes.push('fa-times');
          break;
        case ShExCStatus.valid:
          classes.push('fa-check');
          break;
        default:
          throw new Error(
            'Invalid status for icon: ' + this.$store.getters.getShExCStatus,
          );
      }

      return classes.join(' ');
    },
  },
};
</script>

<style scoped></style>
