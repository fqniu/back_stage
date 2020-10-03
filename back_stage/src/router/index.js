import Vue from 'vue'
import VueRouter from 'vue-router'
// import request from '../utils/request'

Vue.use(VueRouter)

// 路由懒加载
const Login = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/Login.vue')
const Reg = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/Reg.vue')
const Home = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/Home.vue')
const Welcome = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/Welcome.vue')

const User = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/User.vue')
const UserAdd = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/Add.vue')
const UserList = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/user/List.vue')

const Library = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/List.vue')
const LibList = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/List.vue')
const LibAdd = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/Add.vue')
const LibType = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/library/Type.vue')

const Permissions = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../pages/permissions/Permissions.vue')


const routes = [{
    path: "/",
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页",
      requiresAuth: true
    },
    children: [{
        path: '/home',
        component: Welcome,
        meta: {
          title: "欢迎"
        }
      },
      {
        path: '/user',
        component: User,
        meta: {
          title: "用户管理"
        }
      },
      {
        path: '/user/list',
        component: UserList,
        meta: {
          title: "用户列表"
        }
      },
      {
        path: '/user/add',
        component: UserAdd,
        meta: {
          title: "用户添加"
        }
      },
      {
        path: '/library',
        component: Library,
        meta: {
          title: "图书管理"
        }
      },
      {
        path: '/library/list',
        component: LibList,
        meta: {
          title: "图书列表"
        }
      },
      {
        path: '/library/add',
        component: LibAdd,
        meta: {
          title: "图书添加"
        }
      },
      {
        path: '/library/type',
        component: LibType,
        meta: {
          title: "图书类型"
        }
      },
      {
        path: '/permissions',
        component: Permissions,
        meta: {
          title: "权限管理"
        }
      },
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
  //判断当前路由是否需要登录授权！，才能访问
  if (to.matched.some(item => item.meta.requiresAuth)) {
    //从本地拿到 存储的userInfo信息！ 用户信息
    let userInfo = localStorage.getItem('userInfo') || {};
    try {
      userInfo = JSON.parse(userInfo)
    } catch (err) {
      userInfo = {}
    }
    console.log("用户名", userInfo);
    // 判断当前用户信息是否包含token
    if (userInfo.authorization) {
      //发起请求 验证token是否过期   暂时先next()
      next();
    } else {
      //若不存在 token 那么就去往 登录页面！
      next({
        path: "/login",
        query: {
          // 跳转到登录页面，并传递 当前点击想要去的 目标页面路径
          redirectTo: to.fullPath
        }
      })
    }
  } else {
    next();
  }
  // next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router