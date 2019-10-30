<template>
    <div class="wrapper">
        <b-container class="container">
            <b-row>
                <b-col lg="6" align-h="center" offset-lg="3">
                    <!-- 輸入信箱密碼、驗證信箱 -->
                    <transition name="inputTransition" mode="out-in">
                        <form class="was-validated" v-show="transitionSwap === 0">
                            <p class="h4 text-center mb-4">註冊</p>
                            <div class="grey-text">
                                <mdb-input label="信箱" icon="envelope" type="email" v-model="userLogin.email" required invalidFeedback="未輸入信箱" />
                                <mdb-input label="密碼" icon="lock" type="password" v-model="userLogin.password" required invalidFeedback="未輸入密碼"/>
                            </div>
                            <!-- <div class="text-right" style="transform:translateY(-10px)">
                                <span class="return-text" @click="toLogin">返回</span>
                            </div> -->
                            <div class="text-center">
                                <div class="btn btn-success" @click="register(true)">下一步</div>
                            </div>
                        </form>
                    </transition>
                    <!-- 輸入個人資訊，完成後註冊成功 -->
                    <transition name="inputTransition" mode="out-in">
                        <form class="was-validated" v-show="transitionSwap === 1">
                            <p class="h4 text-center mb-4">註冊</p>
                            <div class="grey-text">
                                <mdb-input label="姓名" icon="envelope" type="text" v-model="userLogin.name" required invalidFeedback="未輸入姓名" />
                                <mdb-input label="你的電話" icon="lock" type="number" v-model="userLogin.telephone" required invalidFeedback="未輸入電話" />
                                <mdb-input label="你的地址" icon="lock" type="text" v-model="userLogin.address" required invalidFeedback="未輸入地址" />
                                <mdb-input label="你的關於我" icon="lock" type="text" v-model="userLogin.message" />
                            </div>
                            <div class="text-right" style="transform:translateY(-10px)">
                                <span class="return-text" @click="transitionSwap=0">返回</span>
                            </div>
                            <div class="text-center">
                                <div class="btn btn-success" @click="register(false)">註冊</div>
                            </div>
                        </form>
                    </transition>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mdbInput } from 'mdbvue';
export default {
    name: 'register',
    components: {
      mdbInput
    },
    data() {
        return {
            userLogin: {
                email: '',
                password: '',
                name: '',
                telephone: '',
                address: '',
                message: ''
            },
            transitionSwap: 0
        }
    },
    methods: {
        register(emailOnly=false) {
            const {email, password} = this.userLogin
            let apiMethod = 'register'
            let payloadValue = ''
            let transitionNum = 0
            if(emailOnly) {
                apiMethod = 'emailValid'
                payloadValue = 'email',
                transitionNum = 1
            }
            if(email && password) {
                this.$axios.post(`/api/users/${apiMethod}`, emailOnly ? this.userLogin[payloadValue] : this.userLogin).then(res => {
                    console.log(res)
                    if(res.data.success) {
                        this.transitionSwap = emailOnly ? transitionNum : 1
                        if(res.data.finalSuccess) {
                            this.$router.push('/login')
                        }
                    } else {
                        alert(res.data.msg)
                    }
                })
            } else {
                alert('未輸入完成')
            }
            
        },
        toLogin() {
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
}
.return-text{
    font-size: 14px;
    color:grey;
    cursor: pointer;
    
    &:hover{
        color: darkgrey;
    }
}
  .inputTransition-enter-active{
    animation: coming .5s;
  }

  .inputTransition-leave-active{
    opacity: 0;
    
  }
  @keyframes coming{
    from{
      opacity: 0;
      transform: translateY(-20px);
    }
    to{
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>