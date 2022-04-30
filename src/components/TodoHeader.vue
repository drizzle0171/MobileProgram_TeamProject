<template>
  <header>
    <img class ="background" src="../assets/header.png">
    <h1><i>TodoForDays!</i></h1>
    <!-- 달력 기능 완료!-->
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
  </header>
</template>

<script>
import VdatePicker from 'v-calendar/lib/components/date-picker.umd'

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
          // dot: true,
          // bar: true,
          content: '',
          dates: new Date(),
          excludeDates: null,
          order: 0
        }
      ]
    }
  },
  methods: {
    dayClicked(day){
      this.selectedYear = Number(day.id.slice(0, 4));
      this.selectedMonth = Number(day.id.slice(6, 7));
      this.selectedDay = Number(day.id.slice(8, 10));
      this.$emit('changeDate', this.selectedYear, this.selectedMonth, this.selectedDay);
    }
  },
  components: {
    VdatePicker: VdatePicker
  }
}

</script>

<style scoped>
  h1 {
    font-size: 40px;
    position: absolute;
    color: white;
    font-weight: 900;
    margin: 30px 0 25px;
    transform: translate(0%, -50%);
    right: 50%;
    left: 20%;
    top: 12.5%;
    bottom: 50%;
  }
  .vc-weeks{
    position: relative;
    display: grid;
    padding: 5px;
    height: 260px;
    width: 95%;
    margin: 10px;
    opacity: 0.9;
    border: 0;
}
  .background{
    width: 110%;
    margin: -60px -10.5rem -1rem -10rem;
  }
</style>
