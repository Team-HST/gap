<template>
  <div>
    <h4 v-for="(s, i) in source" :key="`${s}-${i}`">
      {{s}}
    </h4>
  </div>  
</template>

<script>
export default {
  props: {
    source: Array
  }
}
</script>

<style>

</style>