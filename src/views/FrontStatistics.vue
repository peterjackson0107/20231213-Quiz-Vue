<script>
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
}
</script>
<template>
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
p{
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  color: #557;
}
.time{
    width: 30vw;
    height: 7vh;
    margin: 0 auto;
}
.title{
    width: 80vw;
    height: 10vh;
    margin: 0 auto;
}
.div{
    width: 80vw;
    height: 70vh;
    margin: 0 auto;
    border: 1px solid black;
}
.pie-wrap {
  width: 50%;
  height: 400px;
}
</style>