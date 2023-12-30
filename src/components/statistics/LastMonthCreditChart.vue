<script setup lang="ts">
import LEchart from '@/lime-echart/components/l-echart/l-echart.vue';
import {echarts}from "@/utils/charts";
import type {ECOption} from "@/utils/charts";
import {onMounted, ref} from "vue";
//@ts-ignore
const chart = ref<InstanceType<typeof LEchart>>()
// 横向条形图，九月份的必做任务和选做任务完成情况，将图例放在右上角，并缩小图表尺寸，图表居中
const option: ECOption = {
  title: {
    text: '上月获得积分情况',
    left: 'center',
    textStyle: {
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  //缩小图例尺寸
  legend: {
    data:['必做任务','选做任务'],
    left: 'center',
    top: 20,
    itemWidth: 10,
    itemHeight: 10,
  },
  yAxis: {
    data: ["9月"]
  },
  xAxis: {},
  series: [{
    name: '必做任务',
    type: 'bar',
    data: [5]
  },{
    name: '选做任务',
    type: 'bar',
    data: [10]
  }],
  grid: {
    left: 'center',
    top: 'center',
    containLabel: true,
  },
  width: '70%',
  height: '70%',
}

onMounted(()=>{
  chart.value.init(echarts, (chart1: any) => {
    chart1.setOption(option);
  });
  chart.value.resize({
    width: 500,
    height: 200,
  })
})

const init = async ()=>{
  const chartBox = await chart.value.init(echarts);
  chartBox.setOption(option)
}
</script>

<template>
<view class="credit-chart-view">
  <l-echart  class="credit-child-chart" ref="chart" @finish="init"></l-echart>
</view>
</template>

<style scoped lang="scss">
.credit-chart-view{
  width: 100%;
  max-height: 600rpx;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(160, 207, 255, 0.8);
  .credit-child-chart{
    justify-content: center;
    display: flex;
    align-items: center;
  }
}
</style>
