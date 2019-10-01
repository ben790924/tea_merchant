<template>
    <div class="wrapper">
        <b-container class="container">
            <b-row>
                <b-col lg="6" align-h="center" offset-lg="3">
                    <form>
                        <p class="h4 text-center mb-4">登入</p>
                        <div class="grey-text">
                            <mdb-input label="你的信箱" icon="envelope" type="email" v-model="userLogin.email"/>
                            <mdb-input label="你的密碼" icon="lock" type="password" v-model="userLogin.password" />
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
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$axios.post('/api/users/login', this.userLogin).then(res => {
                if(res.data.success) {
                    this.$router.push({path: '/'})
                }
            })
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
</style>