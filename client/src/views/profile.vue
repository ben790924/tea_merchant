<template>
    <div>
        <b-container fluid>
            <!-- 頁籤 -->
            <b-row align-h="center">
                <b-breadcrumb :items="items" class="my-3 breadcrumb"></b-breadcrumb>
            </b-row>
            <!-- 個人資訊 -->
            <b-row>
                <!-- 頭像 -->
                <b-col md="2" sm="2">
                    <div class="image">
                        <b-img src="https://via.placeholder.com/150" fluid alt=""></b-img>
                    </div>
                </b-col>
                <!-- 資訊 -->
                <b-col md="4" sm="10">
                    <div class="info">
                        <div class="name"><span>姓名:</span>棒槌</div>
                        <div class="email"><span>信箱:</span>bontrua@w.wcom</div>
                        <div class="text"><span>留言:</span>我是孟儒，外號叫棒槌，雞雞短</div>
                        <div class="createTime"><span>創建日期:</span>2019/05/04</div>
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
export default {
    name: 'profile',
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
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.info{
    display: flex;
    flex-direction: column;
    letter-spacing: 2px;
    font-size: 18px;
    &>div{
        margin-bottom: 10px;
        &>span{
            font-weight: bold;
            margin-right: 10px;
            border-bottom: 1px solid;
        }
    }
}
</style>