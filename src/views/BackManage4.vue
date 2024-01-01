<script>
export default {
  data() {
    return {
      currentPage: 1,
      surveyName: '',
      surveyDescription: '',
      startTime: '',
      endTime: '',
      newQuestion: '',
      newQuestionType: '单选', // 默认类型
      newOptions: '',
      newIsRequired: false,
      questions: []
    };
  },
  methods: {
    nextPage() {
      this.currentPage = 2;
    },
    prevPage() {
      this.currentPage = 1;
    },
    addQuestion() {
      if (this.newQuestion && this.newQuestionType) {
        let optionsArray = this.newOptions.split(';').map(option => option.trim());

        this.questions.push({
          title: this.newQuestion,
          type: this.newQuestionType,
          options: optionsArray,
          isRequired: this.newIsRequired,
          isSelected: false
        });

        // 清空输入
        this.newQuestion = '';
        this.newQuestionType = '单选'; // 重新设置默认类型
        this.newOptions = '';
        this.newIsRequired = false;
      }
    },
    submitForm() {
      // 在这里可以处理提交表单的逻辑，例如将数据发送到后端保存
      console.log("问卷提交成功");
    }
  },
}
</script>
<template>
  <div id="app">
  <h1 v-if="currentPage === 1">第一页：基本信息</h1>
  <h1 v-if="currentPage === 2">第二页：问题列表</h1>

  <!-- 第一页 输入基本信息 -->
  <div v-if="currentPage === 1">
    <label for="surveyName">问卷名：</label>
    <input type="text" id="surveyName" v-model="surveyName"><br>

    <label for="surveyDescription">问卷说明：</label>
    <textarea id="surveyDescription" v-model="surveyDescription"></textarea><br>

    <label for="startTime">开始时间：</label>
    <input type="date" id="startTime" v-model="startTime"><br>

    <label for="endTime">结束时间：</label>
    <input type="date" id="endTime" v-model="endTime"><br>

    <button @click="nextPage">下一页</button>
  </div>

  <!-- 第二页 问题列表 -->
  <div v-if="currentPage === 2">
    <label for="question">问题题目：</label>
    <input type="text" id="question" v-model="newQuestion"><br>

    <label for="questionType">问题类型：</label>
    <select id="questionType" v-model="newQuestionType">
      <option value="单选">单选</option>
      <option value="多选">多选</option>
      <option value="简答">简答</option>
    </select><br>

    <label for="options">答案选项：</label>
    <input type="text" id="options" v-model="newOptions"><br>

    <label for="isRequired">是否必填：</label>
    <input type="checkbox" id="isRequired" v-model="newIsRequired"><br>

    <button @click="addQuestion">添加问题</button><br>
    <button @click="prevPage">上一页</button>
  </div>

  <!-- 结果展示 -->
  <div v-if="currentPage === 2">
    <h2>问卷信息：</h2>
    <p>问卷名：{{ surveyName }}</p>
    <p>问卷说明：{{ surveyDescription }}</p>
    <p>开始时间：{{ startTime }}</p>
    <p>结束时间：{{ endTime }}</p>

    <h2>问题列表：</h2>
    <table border="1" style="margin: 0 auto;">
      <thead>
        <tr>
          <th>选择</th>
          <th>編號</th>
          <th>題目</th>
          <th>類型</th>
          <th>是否必填</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <td><input type="checkbox" v-model="question.isSelected"></td>
          <td>{{ index + 1 }}</td>
          <td>{{ question.title }}</td>
          <td>{{ question.type }}</td>
          <td>{{ question.isRequired ? '是' : '否' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped lang="scss">
p, label, span, input{
  color: #557;
  font-size: 24px;
}
</style>
