<template>
  <div class="layout">
    <Sidebar />
    <router-view class="layout__view" />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "HelveticaNowText";
  font-weight: 500;
  src: local("HelveticaNowText"),
   url(./assets/fonts/HelveticaNowText-Medium.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaNowText";
  font-weight: 700;
  src: local("HelveticaNowText"),
   url(./assets/fonts/HelveticaNowText-Bold.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaNowText";
  font-weight: 400;
  src: local("HelveticaNowText"),
   url(./assets/fonts/HelveticaNowText-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaNowText";
  font-weight: 300;
  src: local("HelveticaNowText"),
   url(./assets/fonts/HelveticaNowText-Light.ttf) format("truetype");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "HelveticaNowText", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  $main-color: #8854dd;
  $secondary-color: #504780;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  &__view {
    padding: 15px 20px;
    width: calc(100% - 68px);
    height: 100%;
    overflow-y: auto;
  }
}
</style>
