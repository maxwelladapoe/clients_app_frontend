<template>
  <div class="d-flex justify-content-center w-100">
    <div id="loading"></div>
  </div>

</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped>
#loading {
  display: inline-block;

  width: 30px;
  height: 30px;
  border: 3px solid rgba(177, 162, 162, 0.3);
  border-radius: 50%;
  border-top-color: #198754;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>