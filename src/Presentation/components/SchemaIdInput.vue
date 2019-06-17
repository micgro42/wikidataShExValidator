<template>
  <div>
    <label for="SchmeaIdInput" class="label">
      EntitySchema ID
    </label>
    <div :class="controlClass">
      <input
        :class="inputClass"
        v-model="SchemaId"
        v-on:change="ShExChanged"
        type="url"
        id="SchmeaIdInput"
        placeholder="E123"
      />
      <ShExCStatusIcon v-if="hasIcon" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ShExCStatus } from '../../Store/ShExCStatus';
import ShExCStatusIcon from './ShExCStatusIcon';

export default {
  name: 'SchemaIdInput',
  data() {
    const q = this.$route.query;
    if (q.schemaURL) {
      const schemaId = q.schemaURL.substring(q.schemaURL.lastIndexOf('E'));
      this.updateSchemaId(schemaId);
      return { SchemaId: schemaId };
    }

    if (q.schemaId) {
      this.updateSchemaId(q.schemaId);
      return { SchemaId: q.schemaId };
    }
    return { SchemaId: '' };
  },
  components: { ShExCStatusIcon },
  methods: {
    ...mapActions({
      updateSchemaId: 'updateSchemaId',
    }),
    ShExChanged() {
      this.updateSchemaId(this.SchemaId);
    },
  },
  computed: {
    inputClass() {
      let className = 'input';
      switch (this.$store.getters.getShExCStatus) {
        case ShExCStatus.none:
        case ShExCStatus.loading:
          break;
        case ShExCStatus.invalid:
        case ShExCStatus.loadingError:
          className += ' is-danger';
          break;
        case ShExCStatus.valid:
          className += ' is-success';
          break;
        case ShExCStatus.inProgress:
          className += 'is-warning';
          break;
        default:
          throw new Error(
            'Unknown parse status: ' + this.$store.getters.getShExCStatus,
          );
      }

      return className;
    },
    controlClass() {
      let className = 'control';
      switch (this.$store.getters.getShExCStatus) {
        case ShExCStatus.none:
        case ShExCStatus.inProgress:
          break;
        case ShExCStatus.loading:
          className += ' is-loading';
          break;
        case ShExCStatus.invalid:
        case ShExCStatus.loadingError:
        case ShExCStatus.valid:
          className += ' has-icons-right';
          break;
        default:
          throw new Error(
            'Unknown parse status: ' + this.$store.getters.getShExCStatus,
          );
      }
      return className;
    },
    hasIcon() {
      return [
        ShExCStatus.loadingError,
        ShExCStatus.valid,
        ShExCStatus.invalid,
      ].includes(this.$store.getters.getShExCStatus);
    },
  },
};
</script>

<style scoped></style>
