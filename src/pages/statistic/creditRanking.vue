<script setup lang="ts">
import LEchart from '@/lime-echart/components/l-echart/l-echart.vue';
import {echarts}from "@/utils/charts";
import type {ECOption} from "@/utils/charts";
import {onMounted, ref} from "vue";

//@ts-ignore
const rankingChart = ref<InstanceType<typeof LEchart>>()

//横向排序柱状图
const rankingOption: ECOption = {
  title: {
    text: '积分排名',
    left: 'center',
    textStyle: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['积分'],
    top: 10,
    right: 10,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    data: ['岳大鹏', '岳一鹏', '岳二鹏', '岳三鹏', '岳四鹏', '岳五鹏', '岳六鹏'],
  },
  series: [
    {
      name: '积分',
      type: 'bar',
      data: [182, 234, 290, 104, 131, 630, 731].sort(),
      itemStyle: {
          color: function (params: any) {
            const colorList = [
              '#2ec7c9',
              '#b6a2de',
              '#5ab1ef',
              '#ffb980',
              '#d87a80',
              '#8d98b3',
              '#e5cf0d',
              '#97b552',
              '#95706d',
              '#dc69aa',
              '#07a2a4',
              '#9a7fd1',
              '#588dd5',
              '#f5994e',
              '#c05050',
              '#59678c',
              '#c9ab00',
              '#7eb00a',
              '#6f5553',
              '#c14089',
            ];
            return colorList[params.dataIndex];
        },
      },
    },
  ],
};

// 初始化
const initRanking = async () => {
  const chartBox = await rankingChart.value.init(echarts);
  chartBox.setOption(rankingChart)
};

onMounted( () => {
  rankingChart.value.init(echarts, (chart1: any) => {
    chart1.setOption(rankingOption);
  });
});

</script>

<template>
<view>
  <l-echart ref="rankingChart" @finish="initRanking"></l-echart>
</view>
</template>

<style scoped lang="scss">

</style>
