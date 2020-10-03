<template>
  <div class="login_wrap">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
      class="demo-ruleForm form_wrap">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input style="width:70%" type="number" v-model="ruleForm.tel" autocomplete="off"></el-input>
        <span class="send" style="width:30%">发送短信</span>
      </el-form-item>
      <el-form-item label=" 短信验证" prop="note">
        <el-input type="text" v-model="ruleForm.note" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="免登陆" prop="mdl">
        <el-checkbox checked v-model="ruleForm.mdl" autocomplete="off"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      //表单验证相关
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback()
        }
      };
      var checkPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else {
          callback()
        }
      };
      var checkNote = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('短信不能为空'));
        } else {
          callback()
        }
      };

      return {
        ruleForm: {
          username: '',
          password: "",
          tel: "",
          note: "",
          mdl: ""
        },
        rules: {
          username: [{
            validator: checkUserName,
            trigger: 'blur'
          }],
          password: [{
            validator: checkPass,
            trigger: 'blur'
          }],
          note: [{
            validator: checkNote,
            trigger: 'blur'
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        // console.log("11", this.ruleForm);
        //点击登录 之后 验证成功后 发起请求 对账号的验证！
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await this.$request.post("/login", {
              ...this.ruleForm
            })
            // console.log("res", res);
            //如果 登录成功就跳转到home页之中
            if (res.code === 1) {
              localStorage.setItem("userInfo", JSON.stringify(res.data))
              this.$router.push({
                name: "Home"
              })
            }
            //登录完毕后，拿到用户之前 想要去的页面
            console.log("to", this.$route.query);
            const {
              redirectTo = "/home"
            } = this.$route.query
            this.$router.push(redirectTo)
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  .login_wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .form_wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 600px;
      height: 400px;
      background: yellow;
    }
  }

  .send {
    display: inline-block;
    text-align: center;
    background: #ccc;
  }
</style>