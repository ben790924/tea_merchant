<template>
    <div>
        <div class="cart" @click="getCart">
            <i class="fas fa-shopping-cart"></i>
            <span class="my-cart">購物車</span>
            <span class="counts" v-if="shoppingCarts.length">{{ shoppingCarts.length }}</span>
        </div>
        <div class="grey-background" @click.self="isModalShow" :class="{'is-modal': isShow}">
            <div class="preview-modal">
                <div class="no-cart" v-if="!shoppingCarts.length">
                    <h1>購物車沒有內容...</h1>
                </div>
                <table class="table" v-if="shoppingCarts.length">
                    <thead>
                        <tr>
                            <th>產品</th>
                            <th>價格</th>
                            <th>數量</th>
                            <th>尺寸</th>
                            <th>總金額</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, index) in shoppingCarts" :key="i.key">
                            <td>
                                <div class="cart-item">
                                    <div class="cart-image">
                                        <img :src="i.img">
                                    </div>
                                    <div class="cart-title">
                                        {{ i.title }}
                                    </div>
                                </div>
                            </td>
                            <td>{{ i.fee | currency }}</td>
                            <td>{{ i.quantity }}</td>
                            <td>{{ i.size }}</td>
                            <td>{{ i.fee*i.quantity | currency }}</td>
                                <div class="delete-btn" variant="danger" size="sm" style="padding:5px 3px;" @click="deleteOneCart(index)">
                                    <i class="fas fa-minus-circle" style="font-size:25px"></i>
                                </div>
                        </tr>
                        
                    </tbody>
                </table>
                <b-button class="purchase-button" variant="success" v-if="shoppingCarts.length">結帳去</b-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'cart',
    data() {
        return {
            isShow: true,
            shoppingCarts: []
        }
    },
    
    methods: {
        
        isModalShow() {
            this.isShow = !this.isShow;
        },
        deleteOneCart(index) {
            this.$store.commit('cart/deleteCarts', index);
        },
        getCart() {
            this.isShow =! this.isShow
            this.$axios.get(`/api/carts/getCart/${localStorage.userId}`).then(res => {
                console.log('d的購物車內容', res)
                this.shoppingCarts = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.cart{
    position: relative;
    cursor: pointer;
    .fa-shopping-cart{
        margin-right: 4px;
        font-size: 18px;
    }
    .counts{
        border-radius: 50%;
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        color: #fff;
        background-color: red;
        position: absolute;
        left: 14px;
        top: -5px;
        font-size: 12px;
    }
    
}
.is-modal{
        display: none !important;
    }
.grey-background{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.753);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .preview-modal{
        width: 830px;
        height: 550px;
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        // justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: scroll;
        padding: 20px 15px;
        .no-cart{
            width: 100%;
            height: 100%;
            color: rgb(179, 179, 179);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .purchase-button{
            align-self: flex-end;
            margin-right: 30px;
        }
        .table{
            color: #666;
            width: 100%;
            thead{
                tr{
                    max-width: 100%;
                    th{
                        border: 2px solid rgb(224, 224, 224)
                    }
                }
            }
            tbody{
                tr{
                    max-width: 100%;
                    transform: scale(1);
                    border: 0;
                    td:first-child{
                        .cart-item{
                            width: 100%;
                            display: flex;
                            flex-direction: row;

                            .cart-image{
                                display: inline-block;
                                width: 130px;
                                height: 130px;
                                margin-right: 10px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    background-size: cover;
                                    background-position: center center;
                                }
                            }
                            .cart-title{
                                vertical-align: top;
                                margin-top: 20px;
                                font-size: 16px;
                                font-weight: 600;
                            }
                        }
                    }
                    td{
                        vertical-align: middle;
                        border: 2px solid rgb(224, 224, 224);
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        
                    }
                    .delete-btn{
                            position: relative;
                            right: 37px;
                            width: 0;
                            cursor: pointer;
                            top: 5px;
                            border-radius: 50%;
                            &:hover{
                                color: rgb(209, 209, 209);
                            }
                        }
                }
            }
        }
    }
}
</style>