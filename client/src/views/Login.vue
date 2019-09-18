<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="teal darken-4"
                dark
                flat
              >
                <v-toolbar-title>登入</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="Name"
                    v-model="userInfo.name"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="userInfo.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="teal darken-4 white--text" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
        userInfo: {
            name: '',
            password: ''
        }
    }),
    methods: {
        login() {
            this.$axios.post('/api/users/register', this.userInfo).then(res => {
                console.log('login', res)
            })
        }
    }
  }
</script>
