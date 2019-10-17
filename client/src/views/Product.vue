<template>
    <div>
        <b-container fluid>
            <!-- 大促銷 -->
            <b-row align-h="center">
                <div class="push-notification">
                    <div class="sale-text">
                        <i class="fas fa-bullhorn" style="font-size: 30px;margin-right:10px;"></i>
                        超級大促銷 -20%，請點選此橫幅
                    </div>
                    <div class="sale-time">
                        07 h 20 m
                    </div>
                </div>
            </b-row>
            <!-- 頁籤 -->
            <b-row align-h="center">
                <b-breadcrumb :items="items" class="my-3 breadcrumb"></b-breadcrumb>
            </b-row>
            <!-- 抬頭 -->
            <b-row align-h="center">
                <div class="page-description">
                    <div class="page-title">所有種類的茶</div>
                    <div class="page-content">購買優惠的高山茶、梅山茶、平地茶、東方美人茶</div>
                </div>
            </b-row>
            <!-- 收尋 -->
            <b-row>
                <b-col>
                    <div class="input-group">
                        <b-form-input type="text" class="input-search" placeholder="收尋產品" v-model="filterText"></b-form-input>
                        <div class="input-comfirm">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <!-- 產品 -->
            <b-row>
                <b-col sm="6" xs="12" md="3" v-for="item in filterProducts" :key="item.id">
                    <div class="products">
                        <div class="products-img img-fluid"></div>
                        <div class="products-body">
                            <div class="products-body-title">{{ item.title }}</div>
                            <star :fullColorNum='3' :halfColor="true" />                    
                            <div class="products-body-fee">{{item.fee}}</div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import star from '../components/Star'
import {Input} from 'vue-carousel'
export default {
    name: 'product',
    components: { star },
    data() {
        return {
            items: [
                {
                    text: '首頁',
                    to: {name: 'home'}
                },
                {
                    text: '產品',
                    to: {name: 'product'}
                }
            ],
            products: [],
            filterText: ''
        }
    },
    computed: {
        filterProducts() {
            return this.products.filter(i => {
                return i.title.includes(this.filterText)
            })
        }
    },
    created() {
        this.$axios.get('api/products/getProduct').then(res => {
            this.products = res.data
        })
  }
}
</script>

<style lang="scss" scoped>
.push-notification{
    height: 50px;
    width: 100%;
    background-color: #FEAE01;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    transition: .5s;
    &:hover{
        .sale-text{
            transform: scale(1.1);
            transition: .5s;
        }
    }
    .sale-text{
        font-size: 27px;
        font-weight: bold;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sale-time{
        font-size: 19px;
        font-weight: bold;
        color: #FFFFFF;

    }
}
.page-description{
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    .page-title{
        font-size: 24px;
        color: #565656;
        margin-bottom: 5px;
        letter-spacing: 3px;
        font-weight: bold;
    }
    .page-content{
        color: #5a5a5a;
        font-size: 14px;
    }

}
.input-group{
    width: 250px;
    margin: 30px 0;
    position: relative;
    .input-comfirm{
        position: absolute;
        right: 0px;
        z-index: 99;
        top: 1px;
        border-left: 2px solid #b9b9b9;
        cursor: pointer;
        padding: 7px 17px 6px 17px;
        &:hover{
            background-color: rgb(194, 194, 194);
        }
    }
}
.products{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px 0;
    cursor: pointer;
    .products-img{
        background-image: url('../assets/carousel-tea.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 300px;
        width: 300px;
    }
    .products-body{
        width: 100%;
        height: auto;
        text-align: center;
        .products-body-title{
            font-size: 15px;
            margin-top: 10px;
            color: rgb(0, 146, 19);
            font-weight: bold;
        }
        .products-body-fee{
            color: #8A8A8A;
            margin-top: 6px;
        }
    }
    &:hover{
        background-color: #f3f3f3;
    }
}
</style>