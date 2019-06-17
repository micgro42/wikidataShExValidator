<template>
  <section class="section" id="app">
    <div class="container">
      <SchemaSection />
      <QueryWrapper />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SchemaSection from './components/SchemaSection.vue';
import QueryWrapper from './components/QueryWrapper.vue';

@Component({
  components: {
    QueryWrapper,
    SchemaSection,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
