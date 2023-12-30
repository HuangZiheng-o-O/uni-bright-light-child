<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "uni-mini-router";
import useStore from "@/store/index";
import {loginApi} from "@/api/userApi";
import type {User} from "@/ts/types";

const store = useStore()
const router = useRouter()
const formRef = ref<InstanceType<any>>(null)
const uToastRef = ref<InstanceType<any>>(null)
const formRules = {
  account: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
  ]
}
let formData = reactive<User>({
  account: '',
  password: ''
})

const handleLogin = async () => {
  let validateRes = await formRef.value?.validate()
  if (!validateRes.passed) return
  // loginApi(formData).then(res => {
  //   if (res.code != 200) {
  //     uToastRef.value?.show({
  //       title: '失败主题',
  //       type: 'error',
  //       message: '登录失败',
  //       icon: 'close'
  //     })
  //     return
  //   } else {
  //     uToastRef.value?.show({
  //       title: '成功主题(带图标)',
  //       type: 'success',
  //       message: '登录成功',
  //       icon: 'checkmark'
  //     })
  //     store.token = res.data
  //     router.push('/pages/index/index')
  //   }
  // })
  store.account = '123'
  router.pushTab('/pages/index/index')
}
</script>

<template>
  <view class="login-main-view">
    <view style="height: 200rpx; width: 100%">
    </view>
    <text style="font-weight: bold; font-size: 16px">欢迎登录</text>
    <view class="login-form-view">
      <iui-form ref="formRef" :model="formData" :rules="formRules">
        <!-- 表单项 需要定义 field  -->
        <iui-form-item label="账号" required field="account">
          <iui-input
              v-model="formData.account"
              placeholder="请输入账号"
          />
        </iui-form-item>

        <iui-form-item label="密码" field="password" required>
          <iui-input
              v-model="formData.password"
              placeholder="请输入密码"
          />
        </iui-form-item>
      </iui-form>
      <view style="padding: 16px; width: 80%">
        <iui-button type="primary"  @click="handleLogin" shape="round">登录</iui-button>
      </view>
      <u-toast ref="uToastRef" ></u-toast>
    </view>
    <view style="height: 800rpx; width: 100%">
    </view>
  </view>
</template>

<style scoped lang="scss">
.login-main-view{
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .login-form-view{
    width: 80%;
    height: 80%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
