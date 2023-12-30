<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import LEchart from '@/lime-echart/components/l-echart/l-echart.vue';
import {echarts}from "@/utils/charts";
import type {ECOption} from "@/utils/charts";
import useStore from '@/store/index'
import type {AnswerSheet, Task, AnswerChartDTO} from "@/ts/types";
import {answerPieChartApi, getTaskDetailApi} from "@/api/taskApi";
import {rankListApi} from "@/api/personalApi";

const store = useStore()
//@ts-ignore
const missionChart = ref<InstanceType<typeof LEchart>>()
//@ts-ignore
const averageChart = ref<InstanceType<typeof LEchart>>()

let AnswerSheet = reactive<AnswerSheet>({
  id: "",
  taskId: "",
  childId: "",
  contentsType: "",
  contentsPicture: "",
  contentsVideo: "",
  averageGrade: 0,
})

let AnswerChartDTOList: Array<AnswerChartDTO> = reactive([
  {
    answerSheet: AnswerSheet,
    isNecessary: 0,
  },
])

let isNecessary = 0

let AnswerSheetList = reactive<Array<AnswerSheet>>([
    AnswerSheet
])

let isNecessaryList = reactive<Array<number>>([
    isNecessary
])

let necessaryNum = 0
let unNecessaryNum = 0
let totalNum = 0
let place = 0

const missionOption: ECOption = {
  title: {
    text: '任务完成情况',
    left: 'center',
    textStyle: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    top: 10,
    right: 10,
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {value: necessaryNum, name: '必做'},
        {value: unNecessaryNum, name: '选做'},
      ],
    },
  ],
};
//折线图 1-5月任务完成情况 ，两条线（我的任务。同校平均）
//不平滑
const averageOption: ECOption = {
  title: {
    text: '每月完成任务数',
    left: 'center',
    textStyle: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  //图例
  legend: {
    data: ['我的任务', '同年级平均'],
    top: 20,
    left: 10,
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '我的任务',
      data: [120, 200, 150, 80, 70],
      type: 'line'
    },
    {
      name: '同年级平均',
      data: [100, 180, 130, 70, 60],
      type: 'line'
    },
  ]
};

const screenWidth = uni.getWindowInfo().screenWidth

onMounted(async () => {
  let res = await answerPieChartApi({childId: store.childId}, store.token)
  if (res.code != 200) {
    uni.showToast({
      title: '获取儿童答卷信息失败',
      icon: 'none'
    })
    return
  } else {
    console.log(res)
    AnswerChartDTOList = res.data
    AnswerSheetList = AnswerChartDTOList.map((item: any) => item.answerSheet)
    totalNum = AnswerSheetList.length
    AnswerChartDTOList.forEach(item => {
      if (item.isNecessary == 1) {
        necessaryNum++
      } else {
        unNecessaryNum++
      }
    })
  }

  let res1 = await rankListApi({childId: store.childId}, store.token)
  console.log(res1)
  place = res1.data

  missionChart.value.init(echarts, (chart1: any) => {
    chart1.setOption(missionOption);
  });
  averageChart.value.init(echarts, (chart2: any) => {
    chart2.setOption(averageOption);
  });
})

const initMission = async ()=>{
  const chartBox = await missionChart.value.init(echarts);
  chartBox.setOption(missionOption)
}

const initAverage = async ()=>{
  const chartBox = await averageChart.value.init(echarts);
  chartBox.setOption(averageOption)
}


</script>

<template>
<view class="ranking-list-view">
  <view class="chart-view-box">
    <u-row :custom-style="{width: '100%'}">
      <u-col offset="1" span="11">
        <u-text :text="'已获得' + totalNum + '积分，在全部小朋友中位于第' + place + '位'"></u-text>
      </u-col>
    </u-row>
    <u-divider style="width: 100%"></u-divider>
    <l-echart ref="missionChart" @finish="initMission"></l-echart>
    <u-divider style="width: 100%"></u-divider>
    <l-echart ref="averageChart" @finish="initAverage"></l-echart>
  </view>
</view>
</template>

<style scoped lang="scss">
.ranking-list-view{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #EFEFEF;
  .chart-view-box{
    width: 90%;
    height: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
}
</style>
