<template>
  <header>
    <h1><u><i>TodoForDays</i></u></h1>
    <VdatePicker
      is-expanded
    
      locale="en"
      title-position="center"
      color="blue"
      v-model="endDate"
      @input="clickEndDate()"
      :model-config="modelConfig"
      is-required
      :style="{display:isShowEndCalendar}"
      style="z-index:1"
      :attributes='attributes'
      />
  </header>
</template>

<script>
import VdatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  data(){
    return{
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
  components: {
    VdatePicker: VdatePicker
  }
}

</script>

<style scoped>
  h1 {
    color: #7ca3bb;
    font-weight: 900;
    margin: 30px 0 25px;
  }
</style>
