<template>
  <v-app>
    <!-- <v-app-bar
      class="header-title"
      app color="primary" dark
      @click="onMoveHomeClick"
    >
      <h3>Gaze Analysis Program</h3>
    </v-app-bar> -->
    <v-main class="layout-main">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapMutations(['setData']),
    onMoveHomeClick() {
      if (this.$router.history.current.name !== 'MainView') {
        this.setData([]);
        this.$router.push({name: 'MainView'});
      }
    }
  }
};
</script>

<style scoped>
  .header-title {
    cursor: pointer;
  }

  .layout-main {
    height : 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background: url('assets/back11.jpg') no-repeat center/cover;
}
</style>
