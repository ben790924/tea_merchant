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
        this.$axios.get('/api/profiles/test').then(res => {
            console.log(res)
        })
    }
}
</script>
