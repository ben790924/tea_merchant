<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/home">TeaShop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/product">商品</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto"> 
            <b-navbar-nav right>
              <b-nav-item @click="$router.push('/login')">登入</b-nav-item>
              <b-nav-item @click="$router.push('/register')">註冊</b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
#app{
  min-height: 100vh;
  font-family: '微軟正黑體';
}
</style>
