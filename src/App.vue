<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
export default {
  data() {
    return {
      imagePath:
        "https://media.tenor.com/Uv_G-mhR-poAAAAi/mori-calliope-hololive.gif",
    };
  },
  methods: {
    setupMouseTracking() {
      const img = this.$refs.mouseImage;
      this.handleMouseMove = (e) => {
        var x = e.pageX;
        var y = e.pageY;
        img.style.top = y + 10 + "px";
        img.style.left = x + 10 + "px";
      };
      window.addEventListener("mousemove", this.handleMouseMove);
    },
    removeMouseTracking() {
      window.removeEventListener("mousemove", this.handleMouseMove);
    },
  },
  mounted() {
    this.setupMouseTracking();
  },
  beforeDestroy() {
    this.removeMouseTracking();
  },
  components: {
    Header,
  },
};
let img = document.querySelector("img");
document.addEventListener("mousemove", function (e) {
  let x = e.pageX;
  let y = e.pageY;
  img.style.top = y - 50 + "px";
  img.style.left = x - 50 + "px";
});
</script>

<template>
  <div>
    <img :src="imagePath" alt="Mouse Image" class="mouse-image" ref="mouseImage" style="z-index: 9999999"/>
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100vw;
  height: 15vh;
}
.content {
  width: 100vw;
  height: 100%;
  text-align: center; //置中
  background-color: rgb(241, 234, 255);
}
.mouse-image {
  width: 50px;
  height: 50px;
  position: absolute;
}
</style>
