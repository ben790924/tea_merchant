<template>
    <div>
        <b-container fluid>
            <!-- 頁籤 -->
            <b-row align-h="center">
                <b-breadcrumb :items="items" class="my-3 breadcrumb"></b-breadcrumb>
            </b-row>
            <!-- 個人資訊 -->
            <b-row class="info-wapper">
                <!-- 頭像 -->
                <b-col md="2" sm="2">
                    <div class="image">
                        <b-img :src="userAvatar" fluid alt="" @click="triggerInputFile" class="image-show" v-if="!isLoading"></b-img>
                        <input type="file" name="" ref="inputFile" style="display: none;" @change="uploadAvatar">
                        <loading :active.sync="isLoading" :is-full-page="false"></loading>
                    </div>
                </b-col>
                <!-- 資訊 -->
                <b-col md="4" sm="10">
                    <div class="info">
                        <div class="name" @dblclick="editMode = 1"><span>姓名:</span>{{ profiles.name }}</div>
                        <div class="edit-wrapper">
                            <input type="text" v-if="editMode===1" v-model="profiles.name">
                            <b-button size="sm" v-if="editMode===1" @click="updateProfile('name')">確認</b-button>
                        </div>

                        <div class="email"><span>信箱:</span>{{ email }}</div>

                        <div class="telephone" @dblclick="editMode = 3"><span>電話號碼: </span>{{ profiles.telephone }}</div>
                        <div class="edit-wrapper">
                            <input type="text" v-if="editMode===3" v-model="profiles.telephone">
                            <b-button size="sm" v-if="editMode===3" @click="updateProfile('telephone')">確認</b-button>
                        </div>

                        <div class="text" @dblclick="editMode = 4"><span>留言:</span>{{ profiles.message }}</div>
                        <div class="edit-wrapper">
                            <input type="text" v-if="editMode===4" v-model="profiles.message">
                            <b-button size="sm" v-if="editMode===4" @click="updateProfile('message')">確認</b-button>
                        </div>
                        <div class="text" @dblclick="editMode = 5"><span>地址:</span>{{ profiles.address }}</div>
                        <div class="edit-wrapper">
                            <input type="text" v-if="editMode===5" v-model="profiles.address">
                            <b-button size="sm" v-if="editMode===5" @click="updateProfile('address')">確認</b-button>
                        </div>

                        <div class="createTime"><span>創建日期:</span>{{ profiles.date | formatISOdate}}</div>
                    </div>
                </b-col>
                <!-- 購物車內容 -->
                <b-col md="6" sm="12">
                    要放什麼呢??
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
export default {
    name: 'profile',
    components: {
        Loading
    },
    data() {
        return {
            items: [
                {
                    text: '首頁',
                    to: {name: 'home'}
                },
                {
                    text: '個人資訊',
                    to: {name: 'profile'}
                }
            ],
            profiles: {},
            email: '',
            editMode: 0,
            profileId: '',
            userAvatar: '',
            isLoading: false
        }
    },
    methods: {
        getProfile() {
            this.$axios.get(`api/users/populateUser/${localStorage.userId}`).then(res => {
                console.log(res)
                this.profiles = res.data[0].profiles[0];
                this.email = res.data[0].email
                this.profileId = res.data[0].profiles[0]._id
                this.userAvatar = res.data[0].profiles[0].avatar
            })
        },
        updateProfile(field) {
            this.$axios.put(`api/users/updateUser/${this.profileId}`, {[field]: this.profiles[field]}).then(res => {
                if(res.data.success) {
                    this.editMode = 0
                }
            })
        },
        triggerInputFile() {
            this.$refs.inputFile.click(() => {
                this.uploadAvatar()
            })
        },
        uploadAvatar(e) {
            const files = e.target.files || e.dataTransfer.files;
            const formData = new FormData();
                this.isLoading = true

            formData.append('file', files[0])
            formData.append('upload_preset', process.env.VUE_APP_CLOUD_UPLOADPRESET)
            if (!files.length) {
                return;
            }
            if(localStorage.p_ids) {//先檢查是否有原本照片)，若有及刪除，保持一個client使用一張照片
                this.deleteAvatar(localStorage.p_ids)
            }
            this.$axios({
                url: process.env.VUE_APP_CLOUD_BASEURI,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then(upload => {
                console.log(upload)
                this.userAvatar = upload.data.secure_url
                localStorage.setItem('p_ids', upload.data.public_id)
                this.isLoading = false
                //上傳到profile 資料庫
                this.$axios.put(`api/users/updateUser/${this.profileId}`, {'avatar' : upload.data.secure_url})
                .then(res => {
                    console.log('更新avatar field', res)
                })
            }).catch(err => {
                console.log('cloudinary upload image error', err)
            })
        },
        deleteAvatar(p_id) {
            if(p_id) {
                this.$axios.post('api/cloudinaryDelete', {public_ids: p_id}).then(res => {
                console.log('刪除', res)
                }).catch(err => {
                    console.log('刪除頭像錯誤', err)
                })
            }
        }
    },
    filters: {
        formatISOdate(v) {
            if(typeof(v)==='string') {
                let date = new Date(v);
                return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            }
        }
    },
    created() {
        this.getProfile()
        console.log(process.env.VUE_APP_CLOUD_BASEURI)
    }
}
</script>
<style lang="scss" scoped>
.info-wapper{
    box-sizing: border-box;
    .info{
        display: flex;
        flex-direction: column;
        letter-spacing: 2px;
        font-size: 18px;
        // prevent blue highlighting
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &>div{
            margin-bottom: 5px;
            cursor: pointer;
            &>span{
                font-weight: bold;
                margin-right: 10px;
            }
        }
        .edit-wrapper{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            &>input{
                width: 200px;
                height: 34px;
            }
        }
    }
    .image{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .image-show{
            max-height: 250px;
            min-width: 199px;
            min-height: 210px;
            cursor: pointer;
        }
        &:hover{
            box-shadow: 0 0 5px rgb(86, 255, 80);
        }
    }
}
</style>