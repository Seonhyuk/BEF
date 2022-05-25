<template>
  <div id="root-wrap">
    <div id="wrap1">
      <img src="@/assets/12.jpg" alt="" id="img1">
    </div>
    <div id="wrap2">
      <img src="@/assets/9.jpg" alt="" id="img1">
    </div>
    <div id="wrap3">
      <img src="@/assets/4.jpg" alt="" id="img1">
    </div>
    <div id="wrap4">
      <img src="@/assets/1.jpg" alt="" id="img1">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BefView'
}
</script>

<style>
#root-wrap {
  width: 100%;
  height: 100vh;
  border: 1px solid red;
}
#wrap1 {
  width: 100%;
  height: 100vh;

  filter: brightness(55%);
}
#wrap2 {
  width: 100%;
  height: 100vh;

  filter: brightness(65%);
}
#wrap3 {
  width: 100%;
  height: 100vh;

  filter: brightness(55%);
}
#wrap4 {
  width: 100%;
  height: 100vh;

  filter: brightness(65%);
}
#img1 {
  width: 100%;
  height: 100vh;
}
</style>