<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
          v-if="!dialog"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="teal darken-4"
                dark
                flat
              >
                <v-toolbar-title>註冊</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="暱稱"
                    name="name"
                    v-model="userInfo.name"
                    type="text"
                    autofocus
                    :rules="[rules.required]"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="密碼"
                    name="password"
                    type="password"
                    v-model="userInfo.password"
                    :rules="[rules.password]"
                  ></v-text-field>
                  
                  <v-text-field
                    id="email"
                    label="信箱"
                    name="email"
                    type="email"
                    v-model="userInfo.email"
                    :rules="[rules.email]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="teal darken-4 white--text" @click="register">註冊<v-icon>mdi-heart</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
          <v-row>
            <v-dialog v-model="dialog" width="250px" height="300px" hide-overlay @click:outside="jumpToHome">
                <v-card-text>
                    註冊成功
                </v-card-text>
            </v-dialog>
        </v-row>
      </v-container>
    </v-content>
    <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center d-flex align-center justify-center" height="160px">
        <div class="display-1">填寫內容不正確</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
  </v-app>
</template>

<script>
export default {
data: () => ({
    userInfo: {
        name: '',
        password: '',
        email: ''
    },
    dialog: false,
    rules: {
          required: value => !!value || '人生而有名',
          password: value => {
            const pattern = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
            return pattern.test(value) || '密碼需8個字,必須英文數字'
          },
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '信箱錯了吧？'
          },
        },
        sheet: false
}),
methods: {
    register() {
      const {name, password, email} = this.userInfo
      if(name && password && email) {
        this.$axios.post('/api/users/register', this.userInfo).then(res => {
            if(res == undefined) {
                alert('信箱重複')
            } else {
                this.dialog = true //需要跳轉到login頁面
            }
        })
      } else {
        this.sheet = true
      }
    },
    jumpToHome() {
      this.$emit('loggedIn')
    },
    jumpToLogin() {
      this.$route.push('/sdadads')
    }
},
mounted() {
  console.log(this.$route)
}
}
</script>
<style lang="scss" scoped>
.btn-active{
  color: #BDBDBD;
  background-color: #EEEEEE;
}
</style>