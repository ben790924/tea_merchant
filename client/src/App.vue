<template>
  <v-app>
    <register v-if="isRegisterShow" @loggedIn="showRegister" />
    <v-app-bar app color="teal darken-4" v-if="!isRegisterShow">
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
      <v-btn outlined small color="teal lighten-5" xs @click="showRegister">註冊</v-btn>
    </v-app-bar>
    <v-content v-if="!isRegisterShow">
      <router-view />
    </v-content>
  </v-app>

</template>

<script>

import register from './views/Register'
export default {
  name: 'App',
  components: {
    register
  },
  data: () => ({
    isRegisterShow: false
  }),
  methods: {
    showRegister() {
      this.isRegisterShow = !this.isRegisterShow;
    }
  }
};
</script>
