<template>
    <div>
        {{message}}
    </div>
</template>
<script>
export default {
    name: 'Index',
    compenent: {},
    data() {
        return {
            message: 'gytytytyty'
        }
    },
    mounted() {
        // this.$axios.get('http://localhost:5000/api/profiles/test').then(res => {
        //     this.message = res;
        // })
    }
}
</script>
