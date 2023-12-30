<script setup lang="ts">
import TabBar from "@/components/tabBar/TabBar.vue";
import {useRouter} from "uni-mini-router";
import {reactive} from "vue";
import uploadFile from "@/utils/ossUtil";

const router = useRouter()

const handleClick = ()=>{
  router.push('/pages/test/test')
}

const fileList1 = reactive<Array<any>>([]);
const uploadedFileList = reactive<Array<any>>([]);
// 删除图片
const deletePic = (event: any) => {
  fileList1.splice(event.index, 1);
};

// 新增图片
const afterRead = async (event: any) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists: any = [].concat(event.file);
  let fileListLen = fileList1.length;
  lists.map((item: any) => {
    fileList1.push({
      ...item,
      status: 'uploading',
      message: '上传中',
    });
  });
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(lists[i].url);
    let item = fileList1[fileListLen];
    fileList1.splice(fileListLen, 1, {
      ...item,
      status: 'success',
      message: '',
      url: result,
    });
    fileListLen++;
  }
};

const successCallBack = (res: any) => {
  console.log('res callback', res)
}

const failCallBack = (res: any) => {
  console.log('res', res)
}
const uploadFilePromise = async (url: string) => {
  console.log('url', url)
  uploadFile(url, '', successCallBack, failCallBack)
};
</script>

<template>
  <view>
    <u-button @click="handleClick">哈哈哈</u-button>\
    <view>
      <u-upload
          :fileList="fileList1"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="10"
      ></u-upload>
    </view>
    <tab-bar></tab-bar>
  </view>
</template>

<style scoped lang="scss">

</style>

