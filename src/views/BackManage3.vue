<script>
export default {
    data() {
    return {
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
    deleteSelectedQuestions() {
      this.questions = this.questions.filter(question => !question.isSelected);
      this.questions.forEach(question => (question.isSelected = false));
    }
  },
}
</script>
<template>
  <div id="app">
  <h1>问卷应用</h1>

  <!-- 输入表单 -->
  <div>
    <label for="surveyName">问卷名：</label>
    <input type="text" id="surveyName" v-model="surveyName"><br>

    <label for="surveyDescription">问卷说明：</label>
    <textarea id="surveyDescription" v-model="surveyDescription"></textarea><br>

    <label for="startTime">开始时间：</label>
    <input type="date" id="startTime" v-model="startTime"><br>

    <label for="endTime">结束时间：</label>
    <input type="date" id="endTime" v-model="endTime"><br>

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

    <button @click="addQuestion">添加问题</button>
  </div>

  <!-- 问题列表 -->
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

  <!-- 删除问题按钮 -->
  <button @click="deleteSelectedQuestions">删除问题</button>
</div>
</template>

<style scoped lang="scss">
p, label, span, input{
  color: #557;
  font-size: 24px;
}
</style>