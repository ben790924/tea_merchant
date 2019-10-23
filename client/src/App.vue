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
              <b-nav-item>
                <Cart />
              </b-nav-item>
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
    <b-container fluid class="footer">
        <b-row>
          <b-col>
            <div class="about-us">
              <div class="about-us-title">關於我們</div>
              <div class="about-us-address">桃園市龍岡區後龍街35號</div>
              <div class="about-us-tel">+886 981344218</div>
              <div class="about-us-email">
                <a href="mailto:ben790924@gmail.com" target="_blank">Email</a>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="direct-buy">
              <div class="direct-buy-title text-center">直接購買</div>
              <b-form-input class="direct-buy-whatbuy" type="text" placeholder="要買什麼?"></b-form-input>
              <b-form-input class="direct-buy-email" type="email" placeholder="輸入Email"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div class="dev-author">
              <div class="dev-author-title">關於開發者</div>
              <div class="dev-author-intro">
                <a href="https://www.cakeresume.com/5afa59">Author</a>
              </div>
              <div class="dev-author-pork">
                <div class="want-pork text-center">幫忙開發</div>
                <a href="#"><i class="fas fa-code-branch"></i> PORK</a>
                <a href=""><i class="fab fa-github"></i> Github</a>
              </div>

            </div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>
<script>
import Cart from './components/Cart'
export default {
  components: {
    Cart
  }
}
</script>
<style lang="scss" scoped>
#app{
  min-height: 100vh;
  font-family: '微軟正黑體';
}
.footer{
  margin-top: 30px;
  position: relative;
  width: 100%;
  bottom: 0;
  height: 200px;
  background-color: #FAFAFA;
  color: #222;
  .about-us{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    letter-spacing: 1px;
    .about-us-title{
      font-weight: bold;
      font-size: 20px;
    }
    .about-us-email{
      &>a{
        color: #222;
      }
    }
    &>div{
      margin-bottom: 20px;
      
    }
  }
  .direct-buy{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 7px 0;
    letter-spacing: 1px;
    .direct-buy-title{
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 20px;
    }
    &>input{
        margin-bottom: 20px;
        width: 280px;
      }
  }
  .dev-author{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 7px 0;
    letter-spacing: 1px;
    .dev-author-title{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    &>div{
      margin-bottom: 20px;
    }
  }
}
</style>
