<script setup lang="ts">
import TabBar from "@/components/tabBar/TabBar.vue";
import {useRouter} from "uni-mini-router";
import {onMounted, reactive, ref} from "vue";
import {listApi} from "@/api/giftApi";
import useStore from "@/store";

const store = useStore()
const router = useRouter()
const searchContent = ref('')
const swiperList = [
    '/static/creditShop.png',
]
const optionList = [
  '推荐物品', '积分排序', '积分排序'
]

const itemList = [
  { id: 1, name: '书包', credit: 300, thumbnail: '/static/shopPictures/backpack.png' },
  { id: 2, name: '笔袋', credit: 100, thumbnail: '/static/shopPictures/pencilcase.png' },
  { id: 3, name: '书本', credit: 150, thumbnail: '/static/shopPictures/book.png' },
  { id: 4, name: '排球', credit: 250, thumbnail: '/static/shopPictures/volleyball.png' },
];

const current = ref(0)
const sectionChange = (e: any) => {
  current.value = e
}
const clickSearch = ()=>{
  console.log('searchContent', searchContent.value)
  listApi({name: searchContent.value}, store.token).then(res => {
    console.log(res)
  })
}

const clickItem = (sth: any) => {
  store.itemDetailPointRequied = sth.credit
  store.itemDetailID = sth.id
  store.itemDetailName = sth.name
  router.push({
    path: '/pages/credit/itemDetail',
  });
}
</script>

<template>
<view>
  <view class="search-input-view">
  <u-search
            placeholder="请输入关键字"
            v-model="searchContent"
            @custom="clickSearch"
            @search="clickSearch"
            show-action>
  </u-search>
</view>
  <u-swiper
      :list="swiperList"
  >
  </u-swiper>
  <iui-space></iui-space>
  <u-row justify="center">
    <u-col :offset="1" span="3" justify="center">
      <iui-statistic style="margin-left: 100rpx" title="可用积分" :value="450">
      </iui-statistic>
    </u-col>
    <u-col span="4">
      <u-button size="small" text="积分兑换" icon="bag"
                type="info" plain :custom-style="{width: '70%'}"
                shape="circle">

      </u-button>
    </u-col>
    <u-col span="4">
      <u-button size="small" text="排行榜" icon="list"
                type="info" plain :custom-style="{width: '70%'}"
                shape="circle"></u-button>
    </u-col>
  </u-row>
  <u-divider></u-divider>
  <u-subsection  :list="optionList"
                 :current="current"
                 bgColor="#f5f5f5"
                 @change="sectionChange">
  </u-subsection>
  <view class="credit-item-view">
    <u-grid
        :border="false"
        :col="2"
    >
      <u-grid-item
          v-for="(item,index) in itemList"
          :key="item.id"
          @click="clickItem(item)"
      >
        <view style="width: 70%">
        <u-row>
          <u-col span="12">
            <u-image :src="item.thumbnail" mode="widthFix" width="140px" height="140px"></u-image>
          </u-col>
        </u-row>
        <u-row >
          <u-col span="10" >
            <u-row>
              <u-col span="12">
                <u-text :text="item.name" :custom-style="{fontSize: '12px'}"></u-text>
              </u-col>
            </u-row>
            <u-row>
              <u-col span="12">
                <u-text type="primary"
                        :text="item.credit + '分'"
                        :custom-style="{fontSize: '10px'}"></u-text>
              </u-col>
            </u-row>
          </u-col>
          <u-col span="2">
            <u-icon name="shopping-cart"></u-icon>
          </u-col>
        </u-row>
        </view>
      </u-grid-item>
    </u-grid>
    <iui-space direction="vertical" size="large"></iui-space>
    <iui-space direction="vertical" size="large"></iui-space>
  </view>
  <tab-bar></tab-bar>
</view>
</template>

<style scoped lang="scss">
.search-input-view{
  margin: 20px;
}
.credit-item-view{
  margin: 20rpx;

}
</style>
