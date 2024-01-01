<script>
import { RouterLink, RouterView } from "vue-router";
import * as echarts from "echarts";
export default {
  data() {
    return {
      chartPie: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    drawPieChart() {
      let mytextStyle = {
        color: "#333",
        fontSize: 18,
      };
      let mylabel = {
        show: true,
        position: "right",
        offset: [30, 40],
        formatter: "{b} : {c} ({d}%)",
        textStyle: mytextStyle,
      };
      this.chartPie = echarts.init(
        document.getElementById("chartPie"),
        "macarons"
      );
      this.chartPie.setOption({
        title: {
          text: "Pie Chart",
        //   subtext: "纯属虚构",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告"],
          left: "right",
          top: "center",
          orient: "vertical",
          align:"left", //圖片顏色位置
          itemGap: 30,
          textStyle: mytextStyle,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
            label: {
              emphasis: mylabel,
            },
          },
        ],
      });
    },
  },
  components: {
    RouterLink,
  },
};
</script>
<template>
  <div class="header">
    <RouterLink to="/BackManage1" class="link">問卷</RouterLink>
    <RouterLink to="/BackManage2" class="link">題目</RouterLink>
    <RouterLink to="/BackManage3" class="link">問卷回饋</RouterLink>
    <RouterLink to="/BackManage4" class="link">問卷確認</RouterLink>
  </div>
  <div class="time">
    <p>問卷填寫時間</p>
  </div>
  <div class="title">
    <p>問卷名稱</p>
  </div>
  <div class="div">
    <p>題目</p>
    <div id="chartPie" class="pie-wrap"></div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 90vw;
  height: 8vh;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  .link {
    text-decoration: none;
    margin-left: 10px;
  }
}
.time {
  width: 30vw;
  height: 7vh;
  margin: 0 auto;
  font-size: 16px;
}

.title {
  width: 80vw;
  height: 10vh;
  margin: 0 auto;
  font-size: 28px;
}

.div {
  width: 80vw;
  height: 80vh;
  margin: 0 auto;
  border: 1px solid black;

  p {
    font-size: 16px;
  }
}
.pie-wrap {
  width: 50%;
  height: 400px;
}
</style>
