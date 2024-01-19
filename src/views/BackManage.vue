<script>
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router";
import { mapState,mapActions } from 'pinia';
import auth from '../stores/auth';
import * as echarts from "echarts";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      tabID: "one",
      chartPie: null,
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      question: "",
      questionType: "單選題", // 默認類型
      option: "",
      isNecessary: false,
      questions: [],
      qAnswer:[],
      questionsList:[],
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.drawPieChart();
      }, 2000);
    });
},
  methods: {    
    ...mapActions(auth, ["createData"]),
    changeTab(id) {
      this.tabID = id;
    },
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
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告"],
          left: "right",
          top: "center",
          orient: "vertical",
          align: "left", //圖片顏色位置
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
    showAlert() {
      Swal.fire({
        title: "水啦!!!",
        text: "已儲存!!!",
        icon: "success",
      });
    },
    showAlert1() {
      Swal.fire({
        title: "水啦!!!",
        text: "已儲存並送去至資料庫啦啦啦!!!",
        icon: "success",
      });
    },
    addOptions() {
      if (this.question && this.questionType) {
        let optionArray = this.option.split(";").map((option) => option.trim());
        this.questions = {
          title: this.question,
          type: this.questionType,
          option: optionArray.join(', '), //轉字串 因為java類型為字串
          necessary: this.isNecessary,
          isSelected: false,  //143行，這邊不寫預設的話，那邊就要加
          selectedOption: "",
        };

        this.qAnswer.push(this.questions);
        // console.log(this.qAnswer);

        this.questionsList = {
          name: this.name,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          qAnswer:this.qAnswer,
        };

        console.log(this.questionsList);

        // 清空输入
        this.question = "";
        this.questionType = "單選題"; // 重新設置默認類型
        this.option = "";
        this.isNecessary = false;
      }
    },
    deleteSelectedQuestions() {
      this.qAnswer = this.qAnswer.filter(
        (question) => !question.isSelected
      );
    },
    saveNotPublish(){
      this.addOptions(),
      console.log(this.questionsList),
      console.log(this.qAnswer),
      axios({
        url:"http://localhost:8080/quiz/create",
        method:"POST",
        headers:{"Content-Type":"application/json"},
        data:{
          name: this.name,
          description: this.description,
          start_date: this.startDate,
          end_date: this.endDate,
          question_list: this.qAnswer,
          is_published: false,
        },
      })
      .then(
        (res) => {console.log(res);
        console.log(res.data.code)
        console.log(res.data.message)
      })
      // 處理失敗的情況
      .catch(
        (error) => {
          console.error("Error fetching data:", error);
        });
        this.showAlert()
},
    saveAndPublish(){
      this.addOptions(),
      console.log(this.questionsList),
      console.log(this.qAnswer),
      axios({
        url:"http://localhost:8080/quiz/create",
        method:"POST",
        headers:{"Content-Type":"application/json"},
        data:{
          name: this.name,
          description: this.description,
          start_date: this.startDate,
          end_date: this.endDate,
          question_list: this.qAnswer,
          is_published: true,
        },
      })
      .then(
        (res) => {console.log(res);
        console.log(res.data.code)
        console.log(res.data.message)
      })
      // 處理失敗的情況
      .catch(
        (error) => {
          console.error("Error fetching data:", error);
        });
        this.showAlert1()
},
  },
  computed: {    
    ...mapState(auth,["getAuth","getuser"]), //帳號密碼
  },
};
</script>

<template>
<div class="tab-demo">
    <ul class="tab-title">
        <!-- tab標籤列 -->
        <li :class="{ active: tabID == 'one' }" @click="changeTab('one')" style="font-size: 24px;">
            <a href="javascript:;" data-tablink="one">問卷</a>
        </li>
        <li :class="{ active: tabID == 'two' }" @click="changeTab('two')" style="font-size: 24px;">
            <a href="javascript:;" data-tablink="two">題目</a>
        </li>
        <li :class="{ active: tabID == 'three' }" @click="changeTab('three')" style="font-size: 24px;">
            <a href="javascript:;" data-tablink="two">問卷確認</a>
        </li>
        <li :class="{ active: tabID == 'four' }" @click="changeTab('four')" style="font-size: 24px;">
            <a href="javascript:;" data-tablink="two">問卷回饋</a>
        </li>
        <li :class="{ active: tabID == 'five' }" @click="changeTab('five')" style="font-size: 24px;">
            <a href="javascript:;" data-tablink="three">統計</a>
        </li>
    </ul>

    <!-- tab內容 -->
    <div class="tab-inner-wrap">
        <div id="one" class="tab-inner" v-if="tabID == 'one'">
            <!-- tab1的內容 -->
            <div class="content">
              <!-- 輸入表單 -->
              <div class="content1">
                  <label for="surveyName">問卷名稱：</label><br/>
                  <label for="surveyDescription">問卷說明：</label><br/>
                  <label for="startTime" style="margin-top: 185px;">開始時間：</label><br/>
                  <label for="endTime" style="margin-top: 0px;">結束時間：</label><br/>
              </div>
              <div class="content2">
                  <input type="text" id="surveyName" v-model="name" style="width: 660px; margin-top: 17px; font-size: 24px;"/><br/>
                  <textarea cols="49" rows="6" id="surveyDescription" v-model="description" style="resize:none; font-size: 24px; margin-top: 50px;"></textarea><br/>
                  <input type="date" id="startTime" v-model="startDate" style="font-size: 24px; margin-top: 45px;"/><br/>
                  <input type="date" id="endTime" v-model="endDate" style="font-size: 24px; margin-top: 50px;"/><br/>
                  <button style="text-decoration: none; color: #557;; margin-right: 50px; font-size: 24px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557;"><span>取消</span></RouterLink></button>
                  <button @click="changeTab('two')" style="margin-top: 29px; font-size: 24px;"><span>下一步</span></button>
              </div>
            </div>
        </div>

        <div id="two" class="tab-inner" v-if="tabID == 'two'">
            <!-- tab2的內容 -->
            <div class="content">
            <!-- 輸入表單 -->
            <div class="content1">
                <label for="question">問題：</label><br/>
                <label for="questionType">問題類型：</label><br/>
                <label for="option">答案選項：</label><br/>
                <label for="isNecessary">必填：</label>
            </div>

            <div class="content2">
                <input type="text" id="question" v-model="question" style="width: 400px; margin-top: 19px; font-size: 24px;"/><br/>
                <select id="questionType" v-model="questionType" style="font-size: 24px; margin-top: 50px;">
                    <option value="單選題">單選題</option>
                    <option value="多選題">多選題</option>
                    <option value="簡答題">簡答題</option>
                </select><br/>
                <input type="text" id="option" v-model="option" style="width: 400px; font-size: 24px; margin-top: 50px;"/>
                <span style="margin-left: 10px; font-size: 24px;">(選項請以 " ; " 分開)</span><br>
                <input type="checkbox" id="isNecessary" v-model="isNecessary" style="margin-top: 60px;"/>
                <button @click="addOptions()" style="font-size: 24px; margin-left: 50px; margin-bottom: 20px;"><span>加入</span></button><br>
                <!-- 刪除問題按钮 -->
                <button @click="deleteSelectedQuestions()" style="margin-top: 20px;">
                <i class="fa-solid fa-trash-can" style="font-size: 30px;"></i>
                </button>
            </div>
        </div>
            <!-- 問題表格 -->
            <table border="1" style="width: 600px; margin: 30px auto; font-size: 24px; background-color: #557;">
            <thead style= "background-color: rgb(194, 190, 190);">
                <tr>
                <th></th>
                <th>編號</th>
                <th>內容</th>
                <th>問題種類</th>
                <th>必填</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in qAnswer" :key="index">
                <td><input type="checkbox" v-model="question.isSelected" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ question.title }}</td>
                <td>{{ question.type }}</td>
                <td>{{ question.necessary ? "是" : "否" }}</td>
                </tr>
            </tbody>
            </table>

            
            <button style="text-decoration: none; font-size: 24px; margin-right: 50px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557;"><span>取消</span></RouterLink></button>
            <button @click="changeTab('three')" style="margin-top: 29px; font-size: 24px;"><span>前往確認頁</span></button><br>
            <!-- {{ this.qAnswer }} -->
        </div>

        <div id="three" class="tab-inner" v-if="tabID == 'three'">
          <!-- tab3的內容 -->
          <div class="content">
            <div class="paper">
            <div class="date">
              <p style="font-size: 24px;">{{ startDate }}~{{ endDate }}</p>
            </div>
            <div class="up">
              <div class="up1">
                <label>問卷名稱：</label><br>
                <label>問卷說明：</label><br>
              </div>
              <div class="up2">
                <span>{{ name }}</span><br>
                <span style="font-size: 24px;">{{ description }}</span><br>
              </div>
            </div>
            <div class="down">
              <div class="down1" v-for="(question, index) in qAnswer" :key="index">
                <p style="font-size: 24px;">{{ index + 1 }}. {{ question.title }} ({{ question.necessary ? '必填' : '可不填' }})</p>
                <!-- 選項 -->
                  <div class="down2" v-if="question.type === '單選題'">
                    <div v-for="(option, index) in question.option.split(', ')" :key="index">
                      <input type="radio" disabled="disabled" :value="option" v-model="question.selectedOption"/>
                      <span :for="index" style="margin-left: 10px; font-size: 24px;">{{ option }}</span>
                    </div>
                  </div>

                  <div class="down3" v-else-if="question.type === '多選題'">
                    <div v-for="(option, index) in question.option.split(', ')" :key="index">
                      <input type="checkbox" disabled="disabled" :value="option" v-model="question.selectedOption[index]" :id="index"/>
                      <span :for="index" style="margin-left: 10px; font-size: 24px;">{{ option }}</span>
                    </div>
                  </div>
                  
                  <div class="down4" v-else-if="question.type === '簡答題'">
                    <textarea cols="40" rows="4" disabled="disabled" v-model="question.shortAnswer" style="font-size: 24px; resize:none;"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
              <button @click="changeTab('two')" style="margin-top: 29px; font-size: 24px;"><span style="font-size: 24px;">上一頁</span></button>
              <button @click="saveNotPublish()" style="margin-top: 29px; margin-left: 10px; font-size: 24px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557;">儲存</RouterLink></button>
              <button @click="saveAndPublish()" style="margin-top: 29px; margin-left: 10px; font-size: 24px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557;">儲存和送出</RouterLink></button>
        </div>

        <div id="four" class="tab-inner" v-if="tabID == 'four'">
            <!-- tab3的內容 -->
            <div class="content">
            <div class="list" style="margin: 0 auto;">
                <table border="1" style="width: 600px; margin: 30px auto; font-size: 24px;">
                <thead>
                    <tr>
                    <th class="number">編號</th>
                    <th class="name">姓名</th>
                    <th class="time">填寫時間</th>
                    <th class="answer">觀看回覆</th>
                    </tr>
                </thead>
                </table>
            
            </div>
            </div>
            <div class="footer">
              <button style="text-decoration: none; color: #557; margin-right: 50px; font-size: 24px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none;"><span>取消</span></RouterLink></button>
            </div>
        </div>

        <div id="five" class="tab-inner" v-if="tabID == 'five'">
            <!-- tab4的內容 -->
            <div id="chartPie" class="pie-wrap"></div>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
label, p, button, select, tr, td, th, span{
    font-family: "Montserrat", sans-serif;
    color: #557;
}
.tab-inner {
  width: 90vw;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #557;;

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      .content1 {
        width: 40%;
        font-size: 24px;
        text-align: right;
      }
      .content2 {
        width: 60%;
        text-align: left;
      }
      .paper{
      width: 50%;
      height: 100%;
      margin: 0 auto;
      border: 1px solid #557;;
      .date{
        width: 100%;
        text-align: end;
      }
      .up{
      display: flex;
        .up1{
          width: 30%;
          text-align: right;
          font-size: 24px;
        }
        .up2{
          width: 70%;
          text-align: left;
          font-size: 24px;
          line-height: 80px;
        }
      }
      .down{
        width: 68%;
        height: 100%;
        margin: 0 auto;
        .down1{
          text-align: left;
        }
        .down2, .down3, .down4{
          margin-left: 35px;
        }
      }
    }
  }
}
th {
    background-color: rgb(194, 190, 190);
    padding: 10px;
  }

td {
    background-color: rgb(227, 227, 227);
}

label{
    line-height: 80px;
}

.tab-demo {
  padding: 20px;
}

.tab-title {
  display: flex;
}

.tab-title li {
  padding: 10px;
  list-style: none;
}

.tab-title li a {
  display: block;
  padding: 10px;
  color: #557;
  background-color: rgb(255, 244, 210);
  text-decoration: none;
}

.tab-title li.active a {
  color: #557;;
  background-color: rgb(229, 212, 255);
}
.pie-wrap {
  width: 50vw;
  height: 50vh;
}
</style>
