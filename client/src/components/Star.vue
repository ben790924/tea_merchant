<template>
    <div>
        <div class="stars">
            <i v-for="i in 5" :key="i.id" class="far fa-star" :class="{'fas': i<=fullColorNum, 'fa-star-half-alt': halfColorLogic(i)}"></i>
        </div>
        <!-- <i class="fas fa-star custom"></i> -->
        <!-- <i class="fas fa-star-half-alt custom"></i> -->
    </div>
</template>
<script>
export default {
    name: 'star',
    props: {
        fullColorNum: {
            type: Number,
            default: 1
        },
        halfColor: {
            type: Boolean,
            default: false
        }

    },
    methods: {
        halfColorLogic(i) {
            if(this.halfColor && i==this.fullColorNum) {
                return true
            }
            return false
        }
    }
}
</script>
<style lang="scss" scoped>
.stars{
    margin-top: 6px;
}
.far{
    color: #FFCC1B;
}
.fas{
    color: #FFCC1B;
}
</style>