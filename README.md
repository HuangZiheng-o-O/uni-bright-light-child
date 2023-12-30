## 明光筑梦小程序
### ——儿童端
### 项目运行
**This GitHub repository contains a complete frontend code section for the "uni-bright-light" project. While the "uni-bright-light" project has multiple frontend sections, this repository focuses on the child side.**
**The project was subsequently archived at the end of 2023.**

* 1.运行
```bash
npm install
```
安装依赖

* 2.运行
```bash
npm run dev:mp-weixin
```
启动项目
* 3.打开微信开发者工具导入项目

#### 其他方式运行
* 1.网页端运行
```bash
npm run dev:h5
```

### 页面交互编写说明
* 1.路由跳转先引入useRouter
* 2.从上个界面，比如从首页跳转到课程列表页，需要传递参数，
使用
```typescript
router.push({url: '/pages/courseList/index', query: {id: 1}})
```
传递参数  

在课程列表页，使用useRouter获取参数， const router = useRouter()， 使用router.query.id获取参数
* 3.定义响应式数据，对象和list使用reactive，普通变量使用ref，比如
```typescript
// 对象和list
const state = reactive({
  courseList: []
})
// 普通变量
const count = ref(0)
```
* 4.使用生命周期，比如onMounted（组件挂载），在这里面请求数据，比如
```typescript
onMounted(() => {
    // 请求课程列表数据
  getCourseList().then(res => {
    state.courseList = res.data
  })
})
```
* 5.变量在页面上使用，比如
```html
<div v-for="item in state.courseList" :key="item.id">
  {{item.name}}
</div>
<!-- :为v-bind单项绑定，-->
<!-- v-for为循环List获取其中数据，v-model为双向绑定-->
<!-- {{}}为渲染数据到界面，为响应式的 -->
```

* 6.事件绑定，比如
```typescript
const handleClick = (id: number) => {
  console.log(id)
}
```

```html
<div @click="handleClick(item.id)">
  {{item.name}}
</div>
<!-- @为v-on事件绑定，-->
<!-- handleClick为方法名，item.id为参数 -->
```

* 7.条件渲染，比如
```html
<div v-if="state.courseList.length > 0">
  {{state.courseList[0].name}}
</div>
<!-- v-if为条件渲染，v-else为条件渲染，v-show为条件显示，v-hide为条件隐藏 -->
```

* 8.项目使用uView plus，和iui-Design组件库，详细使用参考官方文档
uView plus：https://uiadmin.net/uview-plus/components/modal.html  
iui-Design：https://iyunci.cn/design/uni/components/card.html

* 9.接口都在api文件夹下，使用方式参考，对象类型定义都在types文件夹下，需要用的时候引入即可，
有些接口需要用户id，通过store获得即可，此外所有接口都需要传入token作为鉴权，token在store.token中

* 10.具体例子参考pages/order/orderDetail.vue
