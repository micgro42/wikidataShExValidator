<template>
  <section class="section" id="app">
    <div class="container">
      <SchemaIdInput />
      <QueryWrapper />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SchemaIdInput from './components/SchemaIdInput.vue';
import QueryWrapper from './components/QueryWrapper.vue';

@Component({
  components: {
    QueryWrapper,
    SchemaIdInput,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
