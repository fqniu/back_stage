 <template>
  <div class="home_wrap">
    <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple logo">
            <!-- <img src="@/assets/ali-logo.png" alt /> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-button type="success" class="signOut-btn" @click="signOut">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <!-- 主体内容区 -->
      <el-container class="main">
        <!-- 左侧 -->
        <el-aside width="200px" class="main-l">
          <el-menu
            :default-active="activeIndex"
            :unique-opened="true"
            class="el-menu-demo"
            @select="change"
          >
            <template v-for="item in menu">
              <el-menu-item :index="item.path" width="160px" :key="item.path" v-if="!item.submenu">
                <i :class="item.icon"></i>
                {{item.text}}
              </el-menu-item>
              <el-submenu :index="item.path" :key="item.path" v-else>
                <template v-slot:title>
                  <i :class="item.icon"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :index="item.path+subitem.path"
                  v-for="subitem in item.submenu"
                  :key="subitem.path"
                >{{subitem.text}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>

        <!-- 右侧 -->
        <el-main class="mian-r">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "/home",
      openMenu: ["/user"],
      menu: [
        {
          text: "首页",
          path: "/home",
          currentIndex: 0,
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户列表",
              path: "/list",
            },
            {
              text: "添加用户",
              path: "/add",
            },
          ],
        },
        {
          text: "图书管理",
          path: "/library",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "图书列表",
              path: "/list",
            },
            {
              text: "添加图书",
              path: "/add",
            },
            {
              text: "图书分类",
              path: "/type",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "订单列表",
              path: "/list",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //切换路由
    change(path, idx) {
      this.activeIndex = path;
      this.currentIndex = idx; //这是点击事件修改的idx值！
      this.$router.push(path);
    },
    //退出
    signOut() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("/login");
    },
  },
  components: {},
};
</script>

<style lang="scss" scope>
.el-col-12 {
  width: 100% !important;
}

.home_wrap {
  width: 100%;
  height: 100%;
}
.header {
  height: 80px;
  width: 100%;
  background: #ccc;
}
.container {
  height: calc(100% - 80px);
  width: 100%;
}
.main-l {
  background: orange;
}
.main-r {
  background: pink;
}
</style>