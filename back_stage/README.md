# 项目创建和配置

+ vue create back_stage 创建项目

## 配置启动 package.json

+ npm start 可以启动项目

```js
//第五行
  "scripts": {
    "serve": "vue-cli-service serve",
    "start": "npm run serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

## 配置文件 

+ 在根目录下 创建vue.config.js 配置文件
  * 别名的配置
  * 服务器的配置 服务器代理配置

```js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 服务器的配置
  devServer: {
    open: 'chrome', //浏览器自动打开页面
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 8080,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      //配置跨域
      '/api': {
        target: "http://112.74.111.183:2008/api",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  //别名的配置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
  }
}
```

## 配置 main.js文件中

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element UI框架
import './plugins/element'

// 导入封装axios模块，用于发请求
import request from './utils/request'
// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request


import "./assets/css/normalize.css"
import "./assets/css/base.css"
import "./assets/css/reset.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

## 对ui框架的使用

+ 官网：`https://element.eleme.cn/#/zh-CN/component/installation`

+ 下载：`npm i element-ui -S`

+ 按需导入：`npm install babel-plugin-component -D`

+ 配置：**babel.config.js文件**

  ```js
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }
  ```

+ 按需导入 -> (有问题) 一般来说 全局引入即可！

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/css/normalize.css"
import "./assets/css/base.css"
import "./assets/css/reset.css"

//全局的按钮  导入 在main.js之中引入 并且使用
import {
  Button
} from 'element-ui';

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

+ 按需引入：新建plugin文件夹 element.js

```js
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Header,
  Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Breadcrumb,
  BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination,
  Dialog, MessageBox, Tag, Tree, Select, Option, Cascader, Alert, Tabs, TabPane,
  Step, Steps, Checkbox, CheckboxGroup, Upload,
  Timeline, TimelineItem } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 将弹框组件全局挂在到VUe原形实例
Vue.prototype.$message = Message
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)

```

+ 在main.js中按需引入element.js
```js
// 引入element UI框架
import './plugins/element'
```
+ 路由的配置
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// import request from '../utils/request'

Vue.use(VueRouter)

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/Login.vue')
const Reg = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/Reg.vue')
const Home = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/Home.vue')
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/Welcome.vue')

const User = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/User.vue')
const UserAdd = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/Add.vue')
const UserList = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/List.vue')

const Library = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/List.vue')
const LibList = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/List.vue')
const LibAdd = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/Add.vue')
const LibType = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/Type.vue')

const Permissions = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../pages/permissions/Permissions.vue')
 

const routes = [{
    path: "/",
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页"
    },
    children: [
      { path: '/home', component: Welcome,meta:{ title: "欢迎"} },
      { path: '/user', component: User, meta:{ title: "用户管理"} },
      { path: '/user/list', component: UserList,meta:{ title: "用户列表"} },
      { path: '/user/add', component: UserAdd,meta:{ title: "用户添加"} },
      { path: '/library', component: Library,meta:{ title: "图书管理"} },
      { path: '/library/list', component: LibList,meta:{ title: "图书列表"} },
      { path: '/library/add', component: LibAdd,meta:{ title: "图书添加"} },
      { path: '/library/type', component: LibType,meta:{ title: "图书类型"} },
      { path: '/permissions', component: Permissions,meta:{ title: "权限管理"} },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/Reg',
    name: 'Reg',
    component: Reg,
    meta: {
      title: "注册"
    }
  }
]

const router = new VueRouter({
  // mode : 'history'
  routes
})

// 路由守卫
router.beforeEach((to, form, next) => {
  // 设置title
  document.title = to.matched[0].meta.title
  // //判断当前路由是否需要登录授权！，才能访问
  // if (to.matched.some(item => item.meta.requiresAuth)) {
  //   //从本地拿到 存储的userInfo信息！ 用户信息
  //   let userInfo = localStorage.getItem('userInfo') || {};
  //   try {
  //     userInfo = JSON.parse(userInfo)
  //   } catch (err) {
  //     userInfo = {}
  //   }
  //   // 判断当前用户信息是否包含token
  //   if (userInfo.authorization) {
  //     //发起请求 验证token是否过期   暂时先next()
  //     request.get("/jwtverify", { // 发起请求  检验token是否过期
  //         params: {
  //           authorization: userInfo.authorization
  //         }
  //       })
  //       .then(res => {
  //         // console.log("我是data啊", res.data.code)
  //         if (res.data.code === 1) {
  //           next()
  //         } else {
  //           next({
  //             path: "/login",
  //             query: {
  //               redirectTo: to.fullPath
  //             }
  //           })
  //         }
  //       })
  //     next();
  //   } else {
  //     //若不存在 token 那么就去往 登录页面！
  //     next({
  //       path: "/login",
  //       query: {
  //         // 跳转到登录页面，并传递 当前点击想要去的 目标页面路径
  //         redirectTo: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next();
  // }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
```


