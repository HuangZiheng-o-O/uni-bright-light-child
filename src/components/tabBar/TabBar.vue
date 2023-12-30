<script setup lang="ts">
import useStore from "@/store/index";
import {onBeforeMount, onMounted} from "vue";
import {useRouter} from "uni-mini-router";

const router = useRouter()
const store = useStore()

onMounted(()=>{
  router.pushTab('/pages/index/index')
  store.setActiveTab(0)
})

const tabbarItems = [
  {
    pagePath: '/pages/index/index',
    text: '任务',
    icon: 'order',
  },
  {
    pagePath: '/pages/credit/credit',
    text: '积分',
    icon: 'shopping-cart',

  },
  {
    pagePath: '/pages/chat/chat',
    text: '聊天',
    icon: 'chat',
  },
  {
    pagePath: '/pages/my/my',
    text: '个人中心',
    icon: 'account',
  }
]


const handleTabbarItemClick = (item: any, index: number) => {
  if (store.activeTab !== index) {
    //如果点击的是扫描按钮
    if (index === 1) {
      //根据详细需求书写代码
    } else {
      store.setActiveTab(index)
      const path = item.pagePath
      router.pushTab(path)
    }
  }
}

const changeTab = (e: any) => {
  let index = e
  store.setActiveTab(index)
  let path = tabbarItems[index].pagePath
  // router.pushTab(path)
  router.pushTab(path)
}
</script>

<template>
  <view>
    <u-tabbar :value="store.activeTab" @change="changeTab" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item v-for="(item, index) in tabbarItems" :key="index"
                     :icon="item.icon"
                     :text="item.text"
                     :name="index"
                     >
      </u-tabbar-item>
    </u-tabbar>
  </view>

</template>

<style scoped lang="scss">

</style>
