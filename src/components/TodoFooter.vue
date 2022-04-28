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
  .clearAllContainer {
    width: 100%;
    position: fixed;
    height: 50px;
    background-color: #7ca3bb;
    position: fixed;
    bottom: 0;
    opacity: 0.9;
  }
  .clearAllBtn {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: fixed;
    font-size: 20px;
    color: white;
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #7ca3bb;
    bottom: 0;
  }
</style>
