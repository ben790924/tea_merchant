<template>
    <div class="wrapper">
        <b-container class="container">
            <b-row>
                <b-col lg="6" align-h="center" offset-lg="3">
                    <form class="was-validated">
                        <p class="h4 text-center mb-4">註冊</p>
                        <div class="grey-text">
                            <mdb-input label="你的名稱" icon="signature" type="text" v-model="userLogin.name" required invalidFeedback="未輸入名稱" />
                            <mdb-input label="你的信箱" icon="envelope" type="email" v-model="userLogin.email" required invalidFeedback="未輸入信箱" />
                            <mdb-input label="你的密碼" icon="lock" type="password" v-model="userLogin.password" required invalidFeedback="未輸入密碼" />
                        </div>
                        <div class="text-right" style="transform:translateY(-10px)">
                            <span class="return-text" @click="toLogin">返回</span>
                        </div>
                        <div class="text-center">
                            <div class="btn btn-success" @click="register">註冊</div>
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
    name: 'register',
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
        register() {
            const {email, password, name} = this.userLogin
            if(email && password && name) {
                this.$axios.post('/api/users/register', this.userLogin).then(res => {
                    console.log(res)
                    if(res.data.msg) {
                        alert(res.data.msg)
                    } else {
                        alert('註冊成功')
                        this.$router.push('/login')
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
</style>