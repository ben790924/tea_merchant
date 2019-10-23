<template>
    <div class="wrapper">
        <b-container class="container">
            <b-row>
                <b-col lg="6" align-h="center" offset-lg="3">
                    <form class="was-validated">
                        <p class="h4 text-center mb-4">登入</p>
                        <div class="grey-text">
                            <mdb-input label="你的名稱" icon="signature" type="text" v-model="userLogin.name" required invalidFeedback="未輸入名稱"/>
                            <mdb-input label="你的信箱" icon="envelope" type="email" v-model="userLogin.email" required invalidFeedback="未輸入信箱"/>
                            <mdb-input label="你的密碼" icon="lock" type="password" v-model="userLogin.password" required invalidFeedback="未輸入密碼"/>
                        </div>
                        <div class="text-right" style="transform:translateY(-10px)">
                            <span class="register-text" @click="toRegister">註冊</span>
                        </div>
                        <div class="text-center">
                            <div class="btn btn-success" @click="login">確認</div>
                        </div>
                    </form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mdbInput } from 'mdbvue';
export default {
    name: 'login',
    components: {
      mdbInput
    },
    data() {
        return {
            userLogin: {
                email: '',
                password: '',
                name: ''
            }
        }
    },
    methods: {
        login() {
            const {email, password, name} = this.userLogin
            if(email && password && name) {
                this.$axios.post('/api/users/login', this.userLogin).then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    if(res.data.success) {
                        this.$router.push({path: '/'})
                    } else {
                        alert('輸入不正確或是信箱已註冊')
                    }
                })
            } else {
                alert('資料不正確')
            }
        },
        toRegister() {
            this.$router.push('/register')
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
.register-text{
    font-size: 14px;
    color:grey;
    cursor: pointer;
    
    &:hover{
        color: darkgrey;
    }
}
</style>