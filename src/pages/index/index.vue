<template>
  <view class="content" >
    <last-month-credit-chart />
    <view class="tab-view">
      <u-tabs  :list="tabList" @change="changeTab"></u-tabs>
    </view>
    <view class="mission-list">
      <u-subsection  :list="optionList"
                     :current="current"
                     @change="sectionChange">

      </u-subsection>
    </view>
    <u-divider :custom-style="{width: '100%'}"
               text="分割线"
               :dot="true"></u-divider>
      <must-list v-if="showMust" :query="current" />
    <optional-list v-if="!showMust" :query="current" />
    <tab-bar></tab-bar>
  </view>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import useStore from "@/store/index";
import {request} from "@/utils/request";
import TabBar from "@/components/tabBar/TabBar.vue";
import MustList from "@/components/mission/MustList.vue";
import OptionalList from "@/components/mission/OptionalList.vue";
import LastMonthCreditChart from "@/components/statistics/LastMonthCreditChart.vue";
import {useRouter} from "uni-mini-router";
import {onShow} from "@dcloudio/uni-app";

const router = useRouter()
const store = useStore()
const title = ref('Hello')
const showMust = ref(true)

const tabList = [{name: '必做任务'}, { name: '选做任务'}]

const optionList = [
  '综合', '按紧急程度', '按完成情况'
]
const current = ref(0)
const sectionChange = (e: any) => {
  console.log(e)
  current.value = e
}

const clickButton = () => {
  store.account = '123'
  request('/a', 'GET',{a: 1},'').then(res => {
    console.log(res)
  })
}
const changeTab = (e: any) => {
  console.log(e)
  if (e.index == 0) {
    showMust.value = true
  } else {
    showMust.value = false
  }

}
//
// onShow(()=>{
//   if (store.account == '') {
//     router.push('/pages/login/login')
//   }
// })

onMounted(()=>{
  if (store.account == '') {
    router.push('/pages/login/login')
  }
})


</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.tab-view {
  margin-top: 50rpx;
  width: 100%;
  display: flex;
  justify-content: center;
}
.mission-list {
  margin-top: 50rpx;
  width: 600rpx;
  display: flex;
  justify-content: center;
}
</style>
