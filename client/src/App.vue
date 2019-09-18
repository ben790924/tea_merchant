<template>
  <v-app>
    <login v-if="isLoginShow" />
    <v-app-bar app color="teal darken-4" v-if="!isLoginShow">
      <v-toolbar-title class="headline text-uppercase">
        <span class="white--text">順益茶行</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text class="white--text" to="/about">關於</v-btn>
        <v-btn text class="white--text" to="/buy">買茶</v-btn>
        <v-btn text class="white--text" to="/location">實體</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn outlined small color="teal lighten-5" xs @click="showLogin">登入</v-btn>
    </v-app-bar>
    <v-content v-if="!isLoginShow">
      <router-view />
    </v-content>
  </v-app>

</template>

<script>

import login from './views/Login'
export default {
  name: 'App',
  components: {
    login
  },
  data: () => ({
    isLoginShow: false
  }),
  methods: {
    showLogin() {
      this.isLoginShow = !this.isLoginShow;
    }
  }
};
</script>
