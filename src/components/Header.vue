<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {};
  },
  components: {
    RouterLink,
  },
};
</script>
<template>
  <div class="headerShow">
    <RouterLink to="/" class="link">主頁</RouterLink>
    <RouterLink to="/Front" class="link">前台</RouterLink>
    <RouterLink to="/FrontInside" class="link">問卷填寫頁</RouterLink>
    <RouterLink to="/FrontCheck" class="link">填寫確認頁</RouterLink>
    <RouterLink to="/FrontStatistics" class="link">前台統計</RouterLink>
    <RouterLink to="/Back" class="link">後台</RouterLink>
    <RouterLink to="/BackManage" class="link">後台管理</RouterLink>
    <RouterLink to="/Movie" class="link">電影首頁</RouterLink>
    <RouterLink to="/MovieTest" class="link">電影評論</RouterLink>
    <RouterLink to="/MovieComment" class="link" style="display: none;">單一電影</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.headerShow {
  width: 100vw;
  height: 100%;
  background-color: rgb(208, 162, 247);
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  justify-content: center;
  align-items: center;
  text-align: center;

  a {
    font-family: "Montserrat", sans-serif;
    color: #557;
    font-size: 30px;

    &:hover {
      border-radius: 10px;
      background-color: rgb(220, 191, 255);
      color: rgb(148, 11, 146);
      box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.2);
    }

    &:active {
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.344);
    }
  }
}
.link {
  text-decoration: none;
  font-size: 30px;
  margin: 20px;
  color: rgb(148, 11, 146);
}
</style>
