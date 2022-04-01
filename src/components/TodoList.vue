<template>
  <div>
    <div>
      <div name="list" class="ul">
        <li
          v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"></i>
          <div>
            <span>{{todoItem}}</span>
            <p class="memo">여기는 메모 자리</p>

          </div>
          <span class="moreinfoBtn" type="button" @click="moreInfo(index)">
            <i class="fas fa-plus" aria-hidden="true"></i>
          </span>
        </li>
      </div>
    </div>
    <div class="info-mask" v-if="showInfo == true">
      <div class="info-wrapper">
        <div class="info-container">
          <span class="close" type="button" @click="showInfo = false">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
          <h3 style="text-align: left">
            {{ item }}
            <hr>
          </h3>
          <p style="text-align: left"> <b>D-day</b> 4월 5일</p>
          <p style="text-align: left"> <b>카테고리</b> 학교</p>
          <p style="text-align: left"> <b>중요도</b> 매우 중요</p>
            <p style="text-align: left"> <b>메모</b> 
              <span class="modified" type="button" @click="showInfo=false">
                <i class="fas fa-pencil-alt"></i>
              </span>
                <br> 내가 진짜 싹 다 구현하고 만다.
              </p>
          <span
            class="removeBtn"
            type="button"
            @click="removeTodo(todoItem, index)"
          >
            <i class="fas fa-trash-alt" aria-hidden="true"> 삭제 </i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInfo: false,
      item: "",
    };
  },
  props: ["propsdata"],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit("removeTodo", todoItem, index);
      this.showInfo = false;
    },
    moreInfo(index) {
      this.showInfo = true;
      this.item = this.propsdata[index];
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.info-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.info-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.info-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: auto;
}
li {
  display: flex;
  min-height: 60px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
  font-size: 13px;
}
.moreinfoBtn {
  margin-left: auto;
  color: purple;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.close {
  margin-left: auto;
  color: #de4343;
  float: right;
}
.modified {
  margin-left: auto;
  color: #000000;
  float: right;
}

.memo {
  font-size: 12px;
  color: gray;
}

.aboutTodo{
  display: flex;
  min-height: 60px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  border-radius: 5px;
}
</style>

