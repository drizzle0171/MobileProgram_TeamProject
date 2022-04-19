<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo">Clear All</span>
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
    height: 50px;
    line-height: 50px;
    background-color: #7ca3bb;
    position: fixed;
    bottom: 0;
  }
  .clearAllBtn {
    font-size: 20px;
    color: white;
    display: block;
  }
</style>
