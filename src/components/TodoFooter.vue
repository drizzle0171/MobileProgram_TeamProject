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
    width: 400px;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    /* margin: 0 auto; */
    position: fixed;
    right: 1px;
    bottom: 0;
  }
  .clearAllBtn {
    color: #54cb91;
    display: block;
  }
</style>
