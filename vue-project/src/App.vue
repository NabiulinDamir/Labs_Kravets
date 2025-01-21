<template>
<Todoo></Todoo>
</template>

<script setup>
import Todoo from './components/Todoo.vue';
</script>

<style>
@import './styles/global.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    
  height: 80vh;
  display: flex;
  place-content: center;
  align-items: center;

}

</style>
