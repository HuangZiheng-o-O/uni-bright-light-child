<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import useStore from '@/store/index'
import {onMounted, reactive, ref} from "vue";
import type {Child, ExchangeHistory, LoveProject} from "@/ts/types";
import {setOrderApi} from "@/api/giftApi";
import {getInformationApi} from "@/api/personalApi";

//路由
const router = useRouter()
//pinia状态管理
const store = useStore()

//定义响应式变量
let exchangeItem = reactive<LoveProject>({
  id: '',
  type: '',
  itemName: '学习用品',
  thumbnail: '',
  fund: 0,
  amount: 200,
  requiredCredit: 200
})
const exchangeNum = ref(1)
const showConfirmModal = ref(false)
let childDetail = reactive<Child>({
  id: '',
  account: '',
  password: '',
  avatar: '',
  name: '岳大鹏',
  age: 12,
  gender: '',
  isOrphan: 0,
  isLeftBehind: 0,
  isDisability: 0,
  description: '',
  province: '云南',
  city: '昆明',
  district: 'xxx',
  detailedAddress: 'xxx',

})
let exchangeForm = reactive<ExchangeHistory>({
  id: '',
  thumbnail: '',
  childId: '',
  loveProjectId: '',
  amount: 0,
  description: '',
})

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

//点击兑换
const clickExchange = () => {
  showConfirmModal.value = true
}

//点击模态框取消兑换
const clickModalCancel = () => {
  showConfirmModal.value = false
}

//点击模态框确认兑换
const confirmExchange = () => {
  showConfirmModal.value = false
  exchangeForm = {
    id: '',
    thumbnail: exchangeItem.thumbnail,
    childId: childDetail.id,
    loveProjectId: exchangeItem.id,
    amount: exchangeNum.value * exchangeItem.requiredCredit,
    description: exchangeForm.description,
  }
  console.log(exchangeForm)
  setOrderApi(exchangeForm, store.token).then(res => {
    if (res.code != 200) {
      uni.showToast({
        title: '兑换失败',
        icon: 'none'
      })
      return
    } else {
      uni.showToast({
        title: '兑换成功',
        icon: 'none'
      })
      router.push('/pages/success/exchange')
    }
  }).catch(err => {
    uni.showToast({
      title: '兑换失败',
      icon: 'none'
    })
  })
}

</script>

<template>
<view class="order-detail-view">
  <view class="location-info-view">
    <u-cell-group :border="false">
      <u-cell size="large" :label="'收货人姓名： ' + childDetail.name + ' '+ childDetail.age + '岁' " icon="car">
        <template #title>
          <u-text :text="childDetail.province + childDetail.city +
          childDetail.district + childDetail.detailedAddress">
          </u-text>
        </template>
      </u-cell>
    </u-cell-group>
  </view>
  <view class="item-detail-view">
    <u-row>
      <u-col :offset="1" span="1">
        <iui-icon name="tag" :color="'#f88d14'"></iui-icon>
      </u-col>
      <u-col span="10">
        <text style="font-size: 18px; font-weight: bold">商品信息</text>
      </u-col>
    </u-row>
    <u-row>
      <u-col :offset="1" span="3">
        <u-image :src="exchangeItem.thumbnail" :width="70" :height="70"></u-image>
      </u-col>
      <u-col span="6">
        <text>{{exchangeItem.itemName}}</text>
        <u-text type="info" text="10人兑换"></u-text>
      </u-col>
    </u-row>
    <u-row>
      <u-col :offset="8" span="4">
        <iui-stepper type="outline" v-model="exchangeNum" :min="1" :max="99" :step="1"></iui-stepper>
      </u-col>
    </u-row>
    <u-row>
      <u-col span="12">
        <iui-input v-model="exchangeForm.description"
                   label="订单备注：" placeholder="备注">
        </iui-input>
      </u-col>
    </u-row>
  </view>
  <view class="bottom-button-view">
    <u-row>
      <u-col offset="1" span="2">
          <u-text type="info" :text="'共'+ exchangeNum +'件'"></u-text>
      </u-col>
      <u-col span="5">
        <text style="font-weight: bold">合计：</text>
        <u-text :color="'#f15c33'" size="large" :text="exchangeNum * exchangeItem.requiredCredit"></u-text>
      </u-col>
      <u-col span="4">
        <u-button :color="'#f15c33'"
                  :custom-style="{width: '80%'}"
                  text="立即兑换" shape="circle"
                  @click="clickExchange">
        </u-button>
      </u-col>
    </u-row>
    <u-modal :show="showConfirmModal"
             title="兑换物品"
             content='确认兑换？'
             show-cancel-button
             async-close
             @confirm="confirmExchange"
             @cancel="clickModalCancel"
    >

    </u-modal>
  </view>
</view>
</template>

<style scoped lang="scss">
.order-detail-view{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  background-color: #f5f5f5;
  .location-info-view{
    margin-top: 50rpx;
    width: 90%;
    height: 200rpx;
    background-color: #fff;
  }
  .item-detail-view{
    margin-top: 50rpx;
    width: 90%;
    height: 400rpx;
    background-color: #fff;
  }
  .bottom-button-view{
    //吸底
    position: fixed;
    background-color: white;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    padding: 30rpx;
  }
}
</style>
