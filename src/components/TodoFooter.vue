<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo"> <b>모두 지우기</b> </span>
  </div>

</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit('removeAll');
    }
  }
}
</script>

<style scoped>
  /* .clearAllContainer {
    height: 50px;
    background-color: #7ca3bb;
    opacity: 0.9;
  } */
  .clearAllBtn {
    position: fixed;
    display: table-cell;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: fixed;
    font-size: 20px;
    color: white;
    width: 100%;
    height: 80px;
    line-height: 70px;
    background-color: #7ca3bb;
    bottom: 0;
    left:0;
    opacity: 0.8;
  }
</style>
