<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h3>Gaze Analysis Program</h3>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'  
};
</script>
