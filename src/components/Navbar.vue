<template>
    <div class="navbar md-elevation-2">
        <div class="user-info">
            {{ getUsername }}
        </div>

    </div>
</template>

<script>
export default {
    computed: {
        getUsername() {
            return this.$store.getters.username
        }
    },
    name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.navbar {
    width: 300px;
    height: 100vh;
    background-color: #fff;
}
</style>

