<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {useRouter} from "uni-mini-router";
import useStore from "@/store";
import type {Result,  TaskDto} from "@/ts/types";
import {getTaskListApi} from "@/api/taskApi";
import {toRef} from "@vue/runtime-core";

const props = defineProps( {
  query: Number, //
})

const queryProp = toRef(props, 'query')
const store = useStore()
const router = useRouter()
const status = ref('loadmore')
const list = ref(15)
const page = ref(0)
const missionList = reactive<Array<TaskDto>>([
  {
  task: {
    id: '',
    thumbnail: '',
    title: '任务1',
    description: '描述1',
    deadline: '2023-11-16',
    contentsType: 'picture',
    isNecessary: 1,
    correctionTimes: 0
  },
    isFinished: 0,
  },
  {
    task: {
      id: '',
      thumbnail: '',
      title: '任务2',
      description: '描述2',
      deadline: '2023-11-16',
      contentsType: 'picture',
      isNecessary: 1,
      correctionTimes: 0
    },
    isFinished: 0,
  },
  {
    task: {
      id: '',
      thumbnail: '',
      title: '任务3',
      description: '描述3',
      deadline: '2023-11-16',
      contentsType: 'picture',
      isNecessary: 1,
      correctionTimes: 0
    },
    isFinished: 1,
  },
  {
    task: {
      id: '',
      thumbnail: '',
      title: '任务4',
      description: '描述4',
      deadline: '2023-11-16',
      contentsType: 'picture',
      isNecessary: 1,
      correctionTimes: 0
    },
    isFinished: 1,
  }
])

watch(queryProp, (newVal, oldVal)=>{
  getTaskListApi({childId: store.childId, isNecessary: 1, query: newVal}).then((res: Result) => {
    if (res.code != 200) {
      uni.showToast({
        title: '获取任务列表失败',
        icon: 'none'
      })
      return
    } else {
      missionList.splice(0, missionList.length)
      missionList.push(...res.data)
    }
  }).catch((err: any) => {
    console.log(err)
  })
})

const onReachBottom = ()=> {
  status.value = 'loading';
  setTimeout(() => {
    status.value = 'nomore';
  }, 2000)
}

const clickMission = (id: string) => {
  store.taskId = id
  router.push('/pages/mission/submitMission')
}

onMounted(()=>{
  getTaskListApi({childId: store.childId, isNecessary: 1, query: queryProp}).then((res: Result) => {
    if (res.code != 200) {
      uni.showToast({
        title: '获取任务列表失败',
        icon: 'none'
      })
      return
    } else {
      missionList.splice(0, missionList.length)
      missionList.push(...res.data)
    }
  }).catch((err: any) => {
    console.log(err)
  })
})

const buttonText = (isFinished: number)=>{
  if (isFinished == 0) return '去完成'
  if (isFinished == 1) return '去回顾'
}

const buttonPlain = (isFinished: number)=>{
  if (isFinished == 0) return false
  if (isFinished == 1) return true
}
</script>

<template>
  <view class="sub-sect" >
    <view class="card-list-view">
        <iui-card v-for="(item, index) in missionList" style="width: 80%">
          <u-row justify="space-around">
            <u-col span="2">
              <u-avatar :text="5 + '分'" :custom-style="{fontSize: '10px', backgroundColor: '#a0cfff'}"></u-avatar>
            </u-col>
            <u-col span="6">
              <u-row>
                <u-col span="12">
                  <u-text :custom-style="{fontSize: '12px'}" :text="item.task.title"></u-text>
                </u-col>
              </u-row>
              <u-row>
                <u-col span="12">
                  <u-text :custom-style="{fontSize: '8px'}" type="info" :text="'截止日期：' + item.task.deadline"></u-text>
                </u-col>
              </u-row>
            </u-col>
            <u-col span="2">
              <u-row>
                <u-col span="12">
                  <u-button size="small" type="primary" :plain="buttonPlain(item.isFinished)" :text="buttonText(item.isFinished)" @click="clickMission(item.task.id)"></u-button>
                </u-col>
              </u-row>
            </u-col>
          </u-row>
        </iui-card>
      <u-loadmore :status="status" @loadmore="onReachBottom"/>
    </view>
  </view>
</template>

<style scoped lang="scss">
.sub-sect{
  margin-top: 20rpx;
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  .card-list-view{
    width: 800rpx;
    height: auto;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column;
    }
}
</style>
