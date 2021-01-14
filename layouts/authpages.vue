<template>
  <v-app dark>
    <div>

      
    
      <v-app-bar color="#13274a" flat>
        <nuxt-link to="/frames">
          <div class="text-capitalize fnt">project boba</div>
        </nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link to="/frames/collections">
          <v-btn rounded color="#ecf4ff" dark text class="text-capitalize mx-2"
            >wallet</v-btn
          >
        </nuxt-link>

        <nuxt-link to="/frames">
          <v-btn rounded color="#ecf4ff" dark text class="text-capitalize mx-2"
            >escrow</v-btn
          >
        </nuxt-link>

        <nuxt-link to="/frames">
          <v-btn rounded color="#ecf4ff" dark text class="text-capitalize mx-2"
            >profile</v-btn
          >
        </nuxt-link>
      </v-app-bar>
      <v-main>
       
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>



export default {
  
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ecf4ff;
}
a {
  text-decoration: none;
}

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color:#ecf4ff;
}

</style>
