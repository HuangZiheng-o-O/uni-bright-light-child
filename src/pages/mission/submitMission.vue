<script setup lang="ts">
//任务提交
import {onMounted, reactive, ref} from "vue";
import useStore from "@/store";
import {useRouter} from "uni-mini-router";
import {finishTaskApi, getTaskByIdApi, getTaskDetailApi} from "@/api/taskApi";
import uploadFile from "@/utils/ossUtil";
import type {Result} from "@/ts/types";

const router = useRouter()
const store = useStore()
const missionPoint = ref(0)
const picSrc = '/static/itemTest.png'
const description = ref('描述描述描述描述')
const isVideo = ref(false)
const uploadAccept = ref('image')


let answerSheet = reactive({
  id: '',
  taskId: '',
  childId: '',
  contentsType: '',
  contentsPicture: '',
  contentsVideo: '',
  averageGrade: 0
})

let task = reactive({
  id: '',
  thumbnail: '',
  title: '背诵《满江红》并写感想',
  description: '',
  deadline: '',
  contentsType: 'picture',
  isNecessary: 0,
  correctionTimes: 0
})

const taskToAnswer = ()=>{

}
const switchUpload = (e: any) => {
  isVideo.value = e
  uploadAccept.value = e ? 'video' : 'image'
}
const sliderInput = (e: any) => {
  missionPoint.value = e
  answerSheet.averageGrade = e
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
  if (isVideo.value) {
    answerSheet.contentsVideo = res
  } else {
    answerSheet.contentsPicture = res
  }
  console.log('res callback', res)
}

const failCallBack = (res: any) => {
  console.log('res', res)
}
const uploadFilePromise = async (url: string) => {
  console.log('url', url)
  uploadFile(url, '/task', successCallBack, failCallBack)
};

const clickSubmit = () => {
  if (isVideo.value) {
    if (answerSheet.contentsVideo == '') {
      uni.showToast({
        title: '请上传视频',
        icon: 'none'
      })
      return
    }
  } else {
    if (answerSheet.contentsPicture == '') {
      uni.showToast({
        title: '请上传图片',
        icon: 'none'
      })
      return
    }
  }
  answerSheet.childId = store.childId
  answerSheet.taskId = store.taskId
  answerSheet.contentsType = isVideo.value ? 'video' : 'picture'
  finishTaskApi(answerSheet, store.token).then(res =>{
    if (res.code == 200) {
      uni.showToast({
        title: '提交成功',
        icon: 'none'
      })
      router.pushTab('/pages/index/index')
    } else {
      uni.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
  })
}


onMounted(() => {
  console.log('onMounted')
  getTaskByIdApi({taskId: store.taskId}, store.token).then((res: Result) => {
    if (res.code == 200) {
      task = res.data
      console.log(task)
    } else {
      uni.showToast({
        title: '获取任务失败',
        icon: 'none'
      })
    }
  })
})
</script>

<template>
  <view class="examine-mission-view">
    <u-divider :custom-style="{width: '100%'}"></u-divider>
    <view class="card-mission-view">
      <iui-card :border="false"
                :body-style="{backgroundColor: '#fde277', borderRadius: '10px'}"
                style="width: 90%"
                shadow
      >
        <u-row>
          <u-col span="1">
            <iui-icon :color="'#f5c928'" name="heart-fill"></iui-icon>
          </u-col>
          <u-col span="11">
            <u-row>
              <u-col span="9">
                <u-text type="error" :text="task.title"></u-text>
              </u-col>
              <u-col span="3">
                <u-text  :custom-style="{fontSize: '12px'}" :color="'#ae55f6'" text="+5积分"></u-text>
              </u-col>
            </u-row>
          </u-col>
        </u-row>
        <u-row>
          <u-col offset="1" span="2">
            <u-text type="info" :custom-style="{fontSize: '10px'}" text="视频或照片x1"></u-text>
          </u-col>
        </u-row>
      </iui-card>
    </view>
    <u-divider :custom-style="{width: '100%'}"></u-divider>
    <view class="title-view-class">
      <text style="font-weight: bold">任务材料上传：</text>
    </view>
    <view style="width: 90%; margin: 20rpx">
      <u-text size="large" :custom-style="{fontSize: '14px'}" text="是否上传视频："></u-text>
      <u-switch :custom-style="{margin: '5px'}" v-model="isVideo" @change="switchUpload"></u-switch>
      <u-upload
                :file-list="fileList1"
                :accept="uploadAccept"
                @afterRead="afterRead"
                @delete="deletePic"
                multiple
                name="1"
                :max-count-="1">

      </u-upload>
    </view>
    <u-divider :custom-style="{width: '100%'}"></u-divider>
    <view class="title-view-class">
      <text>示例：</text>
    </view>
    <view class="example-view-box">
      <u-image width="600"></u-image>
    </view>
    <u-divider :custom-style="{width: '100%'}"></u-divider>
    <view class="bottom-button-view">
      <u-button @click="clickSubmit" :color="'#f15c33'" text="立即提交" shape="circle"></u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.card-mission-view{
  display: flex;
  justify-content: center;
  width: 100%;
}
.examine-mission-view{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.title-view-class{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20rpx;
  margin-left: 80rpx;
}
.examine-picture-view{
  width: 90%;
  height: 200rpx;
  margin-top: 20rpx;
}
.text-area-class{
  width: 90%;
  height: 200rpx;
  margin-top: 20rpx;
}
.example-view-box{
  width: 90%;
  margin-top: 20rpx;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
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
</style>

