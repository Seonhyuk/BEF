<template>
  <div>
    <p>
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SmallMovie',
  props: {
    movie: Object,
  }
}
</script>

<style>

</style>