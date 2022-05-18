<template>
  <div>
      <span @click="openSidebar">
        <i class="sidebarBtn fas fa-bars"></i>
      </span>
    <div class="head"><h1> TodoForDays </h1></div>
    <span @click="openMypage">
      <i class="mypageBtn fas fa-user"></i>
    </span>
    <VdatePicker   
      trim-weeks
      locale="en"
      title-position="center"
      color="blue"
      is-required
      :attributes='attributes'
      class="vc-weeks"
      v-model="date"
      @dayclick="dayClicked"
      />
    </div>
</template>

<script>
import VdatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapGetters } from 'vuex';

export default {
  data(){
    return{
      date:"",
      selectedDay:'',
      selectedYear:'',
      selectedMonth:'',
      attributes:[
        {
          key:'today',
          highlight:true,
          content: '',
          dates: new Date(),
          excludeDates: null,
          order: 0
        }
      ]
    }
  },
  computed:{
    ...mapGetters({
      'checked':'getDone',
      'Dates':'getDate',
      'todoItems':'getTodos'
    })
  },
  methods: {
    openMypage(){
      this.$router.replace({path: "/mypage"});
    },
    openSidebar(){
      this.$router.replace({path: "/sidebar"});
    },
    closeSidebar(){
      this.total=0;
    },
    dayClicked(day){
      this.selectedYear = Number(day.id.slice(0, 4));
      this.selectedMonth = Number(day.id.slice(6, 7));
      this.selectedDay = Number(day.id.slice(8, 10));
      let selectedDate = [this.selectedYear, this.selectedMonth, this.selectedDay]
      this.$store.commit('changeDate', selectedDate);
    },
  },
  components: {
    VdatePicker: VdatePicker,
  }
}

</script>

<style scoped>
  .head{
    display: block;
    margin: 35px 0 0 70px;
    font-size: 20px;
    color: #7ca3bb;
    font-weight: 900;
    transform: translate(0%, -50%);
    position: fixed;
    top: 25px;
    left: 10px;
    z-index: -10;
  }
  .sidebarBtn{
    position: fixed;
    top: 25px;
    left: 15px;
    float: left;
    font-size: 20px;
    color: #7ca3bb;
    z-index: 9999999;
    margin: 25px 0 0 18px;
  }
  .hideSidebar{
    display: none;
  }
  .mypageBtn{
    position: fixed;
    top: 25px;
    left: 345px; 
    color: #7ca3bb;
    font-size: 20px;
    float: right;
    margin: 25px 18px 0 0;
  }
  .vc-weeks{
    position: fixed;
    left: 15px;
    top: 105px;
    padding: 5px;
    height: 260px;
    width: 358px;
    opacity: 0.9;
    border: 0;
}
  .background{
    width: 110%;
    margin: -60px -10.5rem -1rem -10rem;
  }

</style>
