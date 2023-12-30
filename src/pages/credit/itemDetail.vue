<script setup lang="ts">
import {useRoute, useRouter} from "uni-mini-router";
import useStore from "@/store/index";

import {computed, onMounted, reactive} from "vue";
import {request} from "@/utils/request";
import {getInformationApi} from "@/api/personalApi";
import {detailApi} from "@/api/giftApi";
import {itemPictureApi} from "@/api/giftApi";

import type {LoveProject} from "@/ts/types";
// //传loveProjectId
// //返回LoveProject
// const detailApi = (data: any, token: string = '') => {
//   return request('child/gift/detail', 'GET', data, JSON.stringify({SaToken: token}));
// }
const store = useStore()
const router = useRouter()
const screenWidth = uni.getWindowInfo().screenWidth
const itemDetailID =   store.itemDetailID
const clickExchange = () => {
  store.loveProjectId = '123'
  router.push('/pages/order/orderDetail')
}
let loveProjectDetail = reactive<LoveProject>({
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
})
let textCredit = computed(() => {
  // return '需要积分：' + loveProjectDetail.requiredCredit
  return '需要积分：' + store.itemDetailPointRequied
})
onMounted(async ()=>{
  // let res = await detailApi({loveProjectId: store.loveProjectId}, store.token)
  // if (res.code != 200) {
  //   uni.showToast({
  //     title: '获取孩子信息失败',
  //     icon: 'none'
  //   })
  //   return
  // } else {
  //   console.log(res)
  //   loveProjectDetail = res.data
  // }

  let res2 = await itemPictureApi({ itemDetailID:store.itemDetailID }, store.token)
  if (res2.code != 200) {
    uni.showToast({
      title: '获取图片信息失败',
      icon: 'none'
    })
    return
  } else {
    console.log(res2)
    list1.splice(0, list1.length, ...(res2.data || []) );
  }

})

const list1 = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
  'https://cdn.uviewui.com/uview/swiper/swiper4.png',
  'https://cdn.uviewui.com/uview/swiper/swiper5.png',
  'https://cdn.uviewui.com/uview/swiper/swiper6.png',
]);

// 计算属性获取前三个元素
const list2 = computed(() => list1.slice(0, 3));

// 计算属性获取后三个元素
const list3 = computed(() =>list1.slice(-3));

</script>

<template>
  <view class="item-detail-view">
    <view class="swiper-view-box">
      <u-swiper :list = list2 :custom-style="{width: '100%'}" height="300"></u-swiper>
    </view>
    <view class="information-view-box">
      <u-row :custom-style="{width:'95%'}">
        <u-col :offset="1" span="8">
          <u-text :custom-style="{fontSize: '12px'}" :text=textCredit></u-text>
        </u-col>
        <u-col span="3">
          <u-text type="info" text="10人兑换"></u-text>
        </u-col>
      </u-row>
      <u-row :custom-style="{width:'95%'}">
        <u-col :offset="1" span="11">
<!--          <text style="font-weight: bold; font-size: 18px">{{ loveProjectDetail.itemName }}</text>-->
          <text style="font-weight: bold; font-size: 18px">{{ store.itemDetailName }}</text>
        </u-col>

      </u-row>
    </view>
    <iui-space></iui-space>
    <view class="divider-view-box">
      <u-divider text="好物详情" :custom-style="{width:'60%'}" ></u-divider>
    </view>
    <view style="width: 100%">
      <u-image v-for="(src, index) in list3" :key="index" :width="screenWidth" :src="src"></u-image>
    </view>

    <view class="bottom-button-view">
      <u-button @click="clickExchange" :color="'#f15c33'" text="立即兑换" shape="circle"></u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.item-detail-view{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  .swiper-view-box{
    width: 100%;
    height: 600rpx;
  }
  .information-view-box{
    padding: 50rpx;
    width: 100%;
    height: 100rpx;
  }
  .divider-view-box{
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: center;
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
