<template>
    <div class="grey-background" :class="{'isShow': !isShow}" @click.self="isModalShow">
        <div class="preview-modal">
            <div class="left-pic">
                <div class="left-pic-main">
                    <img :src="modalContent.img" alt="" class="left-pic-main-pic">
                </div>
                <div class="left-pic-preview"></div>
            </div>
            <div class="right-content">
                <div class="right-content-title the-same">{{ modalContent.title }}</div>
                <div class="right-content-star the-same">
                    <star :fullColorNum='3' :halfColor="true" />                    
                </div>
                <div class="right-content-fee the-same">{{ modalContent.fee | currency }}</div>
                <div class="right-content-description the-same">{{ modalContent.description }}</div>
                <div class="right-content-size the-same">
                    <div class="right-content-size-half" @click="sizeActive.size=1" :class="{'size-active': sizeActive.size===1}">一斤</div>
                    <div class="right-content-size-full" @click="sizeActive.size=0" :class="{'size-active': sizeActive.size===0}">半斤</div>
                </div><!-- todo -->
                <div class="right-content-quantity">
                    <b-form-input type="number" size="sm" v-model="inputQuantity" :formatter="formatInput" placeholder="1" class="right-content-quantity-b-input the-same"></b-form-input> &nbsp;&nbsp;包
                </div>
                <div class="right-content-button the-same" @click="addCart">加入購物車</div>
            </div>
        </div>
    </div>
</template>
<script>
import star from '../components/Star'
export default {
    name: 'previewModal',
    components: {
        star
    },
    props: {
        modalContent: {
            type: Object,
            required: true
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sizeActive: {
                size: 0
            },
            inputQuantity: 1
        }
    },
    methods: {
        isModalShow() {
            this.$emit('modalShow')
        },
        formatInput(value) {
            if(value>=0) {
                return value;
            } else {
                return 0;
            }
        },
        addCart() {
            const { title, fee, img } = this.modalContent;
            const shopDetail = {
                title,
                fee,
                img,
                quantity: this.inputQuantity*1,
                size: this.sizeActive.size
            }
            console.log(shopDetail)
            this.$axios.post('/api/carts/cart', shopDetail,{
                headers:{'Authorization': `Bearer ${document.cookie.split('=')[1]}`}
            }).then(res => {
                console.log('購物車內容', res)
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.isShow{
    display: none !important;
}
.grey-background{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
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

        .left-pic{
         width: 48%;   
         height: 100%;
        //  border: 1px solid #000;
         display: flex;
         flex-direction: column;
         padding: 20px;
         .left-pic-main{
             height: 70%;
             margin-bottom: 20px;
             .left-pic-main-pic{
                 width: 100%;
                 height: 100%;
                 background-size: cover;
                 background-position: center center;
             }
         }
         .left-pic-preview{
             border: 1px solid #000;
             height: 25%;
         }
        }
        .right-content{
            width: 52%;
            height: 100%;
            // border: 1px solid #000;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            box-sizing: border-box;
            .the-same{
                margin: 10px 0;
            }
            .right-content-title{
                border-bottom: 1px solid #eeeeee;
                font-size: 24px;
                letter-spacing: 3px;
                font-weight: 400;
            }
            .right-content-star{

            }
            .right-content-description{

            }
            .right-content-fee{
                font-size: 30px;
                margin: 0 !important;
            }
            .right-content-size{
                display: flex;
                box-sizing: border-box;
                .right-content-size-half,.right-content-size-full{
                    width: 100px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    color: grey;
                    font-weight: 600;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    cursor: pointer;
                    margin: 0 20px 0 0;
                    border: 2px solid grey;
                }
                .size-active{
                    background-color: grey;
                    color: #fff;
                }
            }
            .right-content-quantity{
                width: 25%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .right-content-quantity-b-input{
                   
                }
            }
            .right-content-button{
                width: 100%;
                height: 55px;
                text-align: center;
                line-height: 55px;
                background-color: #03BE96;
                color: #fff;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 1px;
                cursor: pointer;
            }
        }
    }
}
</style>