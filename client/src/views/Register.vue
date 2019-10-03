<template>
    <div class="wrapper">
        <b-container class="container">
            <b-row>
                <b-col lg="6" align-h="center" offset-lg="3">
                    <form>
                        <p class="h4 text-center mb-4">註冊</p>
                        <div class="grey-text">
                            <mdb-input label="你的名稱" icon="signature" type="text" v-model="userLogin.name" required/>
                            <mdb-input label="你的信箱" icon="envelope" type="email" v-model="userLogin.email" required/>
                            <mdb-input label="你的密碼" icon="lock" type="password" v-model="userLogin.password" required />
                        </div>
                        <div class="text-right">
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
            this.$axios.post('/api/users/register', this.userLogin).then(res => {
                if(res.data.msg) {
                    alert(res.data.msg)
                } else {
                    alert('註冊成功')
                    this.$router.push('/login')
                }
            })
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