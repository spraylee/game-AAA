<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <cube></cube>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import '../core/main.ts'
import cube from '../components/cube/index.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    cube,
  },
}
</script>
