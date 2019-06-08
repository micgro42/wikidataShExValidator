<template>
  <div class="field">
    <label for="ShExCUrl" class="label">
      ShExC Url
    </label>
    <div :class="controlClass">
      <input
        :class="inputClass"
        v-model="ShexCUrl"
        v-on:change="ShExChanged"
        type="url"
        id="ShExCUrl"
        placeholder="https://www.wikidata.org/wiki/Special:EntitySchemaText/E123"
      />
      <ShExCStatusIcon v-if="hasIcon" />
    </div>
    <div v-if="parseStatus === 'INVALID'">
      <ShExCErrors />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ShExCStatus } from '../../Store/ShExCStatus';
import ShExCErrors from './ShExCErrors';
import ShExCStatusIcon from './ShExCStatusIcon';

export default {
  name: 'ShExCInput',
  data() {
    let ShexCUrl = '';
    const q = this.$route.query;
    if (q.schemaURL) {
      this.updateShExCInStore(q.schemaURL);
      ShexCUrl = q.schemaURL;
    }
    return { ShexCUrl };
  },
  components: { ShExCStatusIcon, ShExCErrors },
  methods: {
    ...mapActions({
      updateShExCInStore: 'updateShExC',
    }),
    ShExChanged() {
      // ToDo: validate before trying to fetch
      this.$router.push({ query: { schemaURL: this.ShexCUrl } });
      this.updateShExCInStore(this.ShexCUrl);
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      parseStatus: 'getShExCStatus',
    }),
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
