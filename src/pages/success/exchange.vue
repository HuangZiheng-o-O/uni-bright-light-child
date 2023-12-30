<script setup lang="ts">
import {useRouter} from "uni-mini-router";

const router = useRouter()

const clickBack = () => {
  router.push('/pages/index/index')
}

const clickDetail = () => {
  router.push('/pages/order/orderDetail')
}
</script>

<template>
<view class="exchange-view-back">
  <view class="success-status-view">
    <iui-button  shape="circle" type="primary" status="success" :size="80" >
      <template #icon>
        <iui-icon name="check" :size="40" :color="'#ffffff'"></iui-icon>
      </template>
    </iui-button>
  </view>
  <iui-card  :shadow="true">
    <template #title>
      <view class="title-card-view">
        <text style="font-weight: bold; font-size: 20px">兑换成功</text>
      </view>
    </template>
    <view>
      <view>您已成功兑换了xxx</view>
      <view>我们会尽快将物品送达</view>
      <view>我如有需要请联系志愿者：</view>
      <u-text type="error" text="xxxxxxxx"></u-text>
    </view>
  </iui-card>
  <view class="bottom-handle-view">
    <u-button :custom-style="{width: '40%'}" @click="clickBack" plain shape="circle" type="info" text="返回首页"></u-button>
    <u-button :custom-style="{width: '40%'}" @click="clickDetail" shape="circle" type="warning" text="查看订单"></u-button>
  </view>
</view>
</template>

<style scoped lang="scss">
.exchange-view-back{
  background-color: rgb(238, 238, 238, 0.5);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .success-status-view{
    margin: 20px 20px 40px;
  }
  .bottom-handle-view{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
  }
}
.title-card-view{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
