<template>
  <div>
    <Navbar></Navbar>
    Hello Vue!
    <nav class="navbar is-fixed-top">
      <div class="level-left"><button class="button">Test</button></div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";

@Component({
  components: { Navbar },
})
export default class App extends Vue {}
</script>

<style lang="sass">
body {
  background-color: green
}
</style>
