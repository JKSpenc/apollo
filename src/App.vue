<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary:rgb(17, 133, 17), // md-get-palette-color(, A200),
     // The primary color of your application
    accent: md-get-palette-color(red, A200),
     // The accent or secondary color
    theme: dark  // This can be dark or light,
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  font-family: 'Poppins', Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background: map-get(
    map-get($md-color-levels, md-get-theme-mode()),
    "background"
  ) !important;
}
</style>
