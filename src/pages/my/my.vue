<script setup lang="ts">

import {ref, onMounted, reactive, toRef, computed} from 'vue';
import TabBar from "@/components/tabBar/TabBar.vue";
import { useRouter } from "uni-mini-router";
import useStore from '@/store/index'
import type {Child, ChildTaskFinishDetailsDTO, LoveProject} from "@/ts/types";
import {getInformationApi} from "@/api/personalApi";
import {getTaskDetailApi} from "@/api/taskApi";
import {getItemListApi} from "@/api/giftApi";

//路由
const router = useRouter()
//pinia状态管理
const store = useStore()


const change = (e: any) => {
  console.log('change', e)
}
const close = (e: any) => {
  console.log('close', e)
}
const open = (e: any) => {
  console.log('open', e)
}

const navigateToRankList = () => {
  console.log('click')
  router.push('/pages/statistic/rankingList')
}

const clickCreditRanking = () => {
  router.push('/pages/statistic/creditRanking')
}


let childTaskFinishDetails = reactive<ChildTaskFinishDetailsDTO>({
  points: 120,  // 假设积分为120
  studyDays: 45,  // 假设学习天数为45天
  completedTasks: 90,  // 假设完成了90个任务
  completionRate: 75.0,  // 假设完成率为75%
})

let childDetail = reactive<Child>({
  id: '001',  // 假设孩子的ID为001
  account: 'yuedapeng',  // 假设账户名为yuedapeng
  password: 'securepassword123',  // 示例密码，请在实际应用中使用安全的密码，并进行加密
  avatar: 'url_to_avatar_image',  // 假设头像图片的URL
  name: '岳大鹏',  // 名字保持不变
  age: 12,  // 年龄保持为12岁
  gender: 'male',  // 性别假设为男
  isOrphan: 1,  // 假设是孤儿
  isLeftBehind: 0,  // 假设不是留守儿童
  isDisability: 0,  // 假设没有残疾
  description: '热爱学习的好孩子',  // 描述
  province: '四川',  // 省份
  city: '成都',  // 城市
  district: '武侯区',  // 区域
  detailedAddress: 'XX街道XX小区XX号',  // 详细地址
})


let loveProjectDetailList = reactive<LoveProject[]>([{
  // 假设有一个明光赠品
  type: "明光赠品",
  id: '001',
  itemName: 'ipad',
  fund: 1000,
  amount: 100,
  requiredCredit: 40,
  startTime: '2023-01-01T08:00:00Z',
  updateTime: '2023-01-02T09:00:00Z',
  remark: '11英寸',
  thumbnail:'https://img.yzcdn.cn/vant/ipad.jpeg'
},{
  type: "明光赠品",
  id: '002',
  itemName: '华为平板',
  fund: 600,
  amount: 80,
  requiredCredit: 60,
  startTime: '2023-04-01T08:00:00Z',
  updateTime: '2023-04-02T09:00:00Z',
  remark: '11英寸',
  thumbnail:'https://img.yzcdn.cn/vant/ipad.jpeg'
}
])


// const getItemListApi = (data: any, token: string = '') => {
//   return request('/gift/getLoveProject', 'GET', data, JSON.stringify({SaToken: token}));
// }
//
// export {listApi, detailApi, setOrderApi, getOrderApi,getItemListApi}

//组件挂载时获取孩子信息
onMounted(async ()=>{
  // 通过store获取childId 获取孩子信息
  let res = await getInformationApi({childId: store.childId}, store.token)
  if (res.code != 200) {
    uni.showToast({
      title: '获取孩子信息失败',
      icon: 'none'
    })
    return
  } else {
    console.log(res)
    childDetail = res.data
  }
})



onMounted(async () => {
  // 通过 store 获取 volunteerId 和 token 获取孩子信息
  try {
    const res = await getItemListApi({childId: store.childId}, store.token);
    if (res.code !== 200) {
      // 使用 uni.showToast 来显示错误信息
      uni.showToast({
        title: '获取商品列表信息失败',
        icon: 'none'
      });
    } else {

      loveProjectDetailList.splice(0, loveProjectDetailList.length, ...(res.data || []));
    }
  } catch (error) {
    // 如果有错误，也显示 Toast 提示
    uni.showToast({
      title: '获取列表信息异常',
      icon: 'none'
    });
    console.error('获取孩子列表失败:', error);
  }

  // 通过store获取childId 获取孩子信息
  let res = await getTaskDetailApi({childId: store.childId}, store.token)
  if (res.code != 200) {
    uni.showToast({
      title: '获取ChildTaskFinishDetailsDTO信息失败',
      icon: 'none'
    })
    return
  } else {
    console.log(res)
    childTaskFinishDetails = res.data
  }
});
//
let textAvatarName = toRef(childDetail, 'name')
let textCityDistrictAddress = toRef(childDetail, 'city')
let textAge = computed(()=>{
  return "年龄：" + childDetail.age
})
let textGender = toRef(childDetail, 'gender')
let textStudyDays = toRef(childTaskFinishDetails, 'studyDays')
let textCompletedTasks = toRef(childTaskFinishDetails, 'completedTasks')
let textCompletionRate = toRef(childTaskFinishDetails, 'completionRate')
let textPoints = toRef(childTaskFinishDetails, 'points')


const clickAgain = () => {
  router.push('/pages/order/orderDetail')
}
</script>

<template>
  <view class="self-back-box">
    <view class="back-semi-circle"></view>
    <view class="self-view-box">
      <iui-avatar
          align="start"
          :avatarName=textAvatarName
      >
        <template #avatarDesc>
          <u-row>

            <u-col span="12">
              <u-text type="info" :text=textCityDistrictAddress></u-text>
            </u-col>
            <u-col span="12">
              <u-text type="info" :text=textAge></u-text>
            </u-col>
          </u-row>
        </template>
      </iui-avatar>
      <u-divider></u-divider>
      <u-row>
        <u-col justify="center" span="12">
          <u-text type="info" text="个人信息"></u-text>
        </u-col>
      </u-row>
      <u-row >
        <u-col justify="center"  span="2">
          <span>性别</span>
        </u-col>
        <u-col justify="center"  span="2">
          <span>
           <u-text :text=textGender></u-text>
          </span>
        </u-col>
      </u-row>
    </view>
    <view class="self-statistic-view">
      <u-row style="width: 100%">

        <u-col  span="3" justify="center">
          <iui-statistic
              title="学习天数"
              :value=textStudyDays
              :valueStyle="{ fontSize: '10px' }"
          >
            <template #prefix>
              <iui-icon name="arrowup" style="font-weight: 600"></iui-icon>
            </template>
            <template #suffix>
              天
            </template>
          </iui-statistic>
        </u-col>

        <u-col span="3" justify="center">
          <iui-statistic
              title="完成任务"
              :value=textCompletedTasks
              :valueStyle="{ fontSize: '10px' }"
          >
            <template #prefix>
              <iui-icon name="arrowup" style="font-weight: 600"></iui-icon>
            </template>
          </iui-statistic>
        </u-col>

        <u-col span="3" justify="center">
          <iui-statistic
              title="完成率"
              :value=textCompletionRate
              :precision="2"
              :valueStyle="{ fontSize: '10px' }"
          >
            <template #suffix>
              %
            </template>
          </iui-statistic>
        </u-col>

        <u-col span="3" justify="center">
          <iui-statistic
              title="获取积分"
              :value=textPoints
              :valueStyle="{ fontSize: '10px' }"
          >
          </iui-statistic>
        </u-col>

      </u-row>
    </view>
    <view class="self-collapse-view">
      <u-collapse
          @change="change"
          @close="close"
          @open="open"
          :custom-style="{marginTop: '20px'}"
      >
        <u-collapse-item
            title="我的订单"
            name="Docs guide"
            icon="order"
        >
            <iui-card v-for="(project, index) in loveProjectDetailList" :key="project.id">
              <view>
                <u-row>
                  <u-col span="1">
                    <iui-icon name="gift" ></iui-icon>
                  </u-col>
                  <u-col span="9">
                    <iui-ellipsis>
                      {{ project.type }}
                    </iui-ellipsis>
                  </u-col>
                  <u-col span="2" justify="center">
                    <u-text type="primary" text="已完成"></u-text>
                  </u-col>
                </u-row>
                <u-row style="margin-top: 20rpx">
                  <u-col span="4">
                    <u-image width="80px" height="80px" :src="project.thumbnail">
                    </u-image>
                  </u-col>
                  <u-col span="8">
                    <u-row>
                      <u-col span="10">
                        <iui-ellipsis>
                          {{ project.itemName }}
                        </iui-ellipsis>
                      </u-col>
                      <u-col span="2">
                        <u-text :custom-style="{fontSize: '9px'}" type="info" :text="`${project.requiredCredit}`"></u-text>
                      </u-col>
                    </u-row>
                    <u-row>
                      <u-col span="10">
                        <u-text :custom-style="{fontSize: '9px'}"
                                type="info"
                                :text="`${project.remark}`">
                        </u-text>
                      </u-col>
                      <u-col span="2">
                        <u-text :custom-style="{fontSize: '9px'}"
                                type="info"
                                text="积分">
                        </u-text>
                      </u-col>
                    </u-row>
                  </u-col>
                </u-row>
                <u-row>
                  <u-col span="2">
                    <u-text text="更多"></u-text>
                  </u-col>
                  <u-col span="2">
                  </u-col>
                  <u-col span="2">
                  </u-col>
                  <u-col :offset="4" span="2">
                    <u-button size="small" type="warning"
                              plain shape="circle"
                              @click="clickAgain"
                              text="再来兑换">
                    </u-button>
                  </u-col>
                </u-row>
              </view>
            </iui-card>
        </u-collapse-item>
      </u-collapse>
      <u-cell-group>
        <u-cell
            @click="navigateToRankList"
            label="情况统计"
            icon="order">
          <template #right-icon>
            <u-icon name="arrow-right" size="20"></u-icon>
          </template>
        </u-cell>
        <u-cell
            label="积分排行榜"
            @click="clickCreditRanking"
            icon="list">
          <template #right-icon>
            <u-icon name="arrow-right" size="20"></u-icon>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
    <tab-bar></tab-bar>
  </view>
</template>

<style scoped lang="scss">
.self-view-box{
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #999999;
  padding: 20px;
}
.back-semi-circle{
  //上半半圆无背景色
  background-color: #33c2f1;
  height:30vh;
  width: 100%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
.self-back-box{
  background-color: rgb(238, 238, 238, 0.5);
  height: 100vh;
}
.self-statistic-view{
  margin-top: 20rpx;
  width: 100%;
  background-color: #ffffff;
  padding: 20rpx;
}
.self-collapse-view{
  margin-top: 20rpx;
  width: 100%;
  background-color: #ffffff;
}
</style>
