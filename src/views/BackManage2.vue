<script>
import { mapState,mapActions } from 'pinia';
import auth from '../stores/auth';
export default {
  data() {},
};
</script>
<template>
  <div class="header">
    <RouterLink to="/BackManage1" class="link">問卷</RouterLink>
    <RouterLink to="/BackManage2" class="link">題目</RouterLink>
    <RouterLink to="/BackManage3" class="link">問卷回饋</RouterLink>
    <RouterLink to="/BackManage4" class="link">問卷確認</RouterLink>
  </div>
  <div class="content">
    <div class="up">
      <div class="question">
        <p>問題：</p>
        <input type="text" class="text" id="" />
        <select name="" id="">
          <option value="">單選題</option>
          <option value="">多選題</option>
          <option value="">簡答題</option>
        </select>
        <input type="checkbox" class="checkbox" id="" />
        <span>必填</span>
      </div>
      <div class="answer">
        <p>選項：</p>
        <span>(多個答案請以; 分隔)</span>
        <textarea name="" id="" cols="40" rows="8"></textarea>
        <button type="submit">加入</button>
      </div>
    </div>
    <div class="down">
      <i class="fa-solid fa-trash-can"></i>
      <div class="list">
        <table>
          <tr>
            <th class="check"></th>
            <th class="number">編號</th>
            <th class="name">內容</th>
            <th class="type">問題種類</th>
            <th class="required">必填</th>
            <th class="edit">編輯</th>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div class="footer">
    <button type="submit" class="before">
      <RouterLink :to="`/BackManage1`" class="rounterItem" style="text-decoration: none;">上一步</RouterLink>
    </button>
    <button type="submit" class="before1">
      <RouterLink :to="`/FrontInside`" class="rounterItem" style="text-decoration: none;">送出</RouterLink>
    </button>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 90vw;
  height: 8vh;
  display: flex;
  justify-content: center;

  .link {
    text-decoration: none;
    margin-left: 10px;
  }
}

.content {
  position: relative;

  .up {
    height: 170px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .question {
      position: absolute;
      font-size: large;
      width: 800px;

      p {
        position: absolute;
        left: 50px;
      }

      .text {
        position: absolute;
        left: 150px;
        height: 25px;
        width: 300px;
      }

      select {
        position: absolute;
        left: 500px;
        top: 3px;
        height: 25px;
        width: 100px;
        font-size: large;
      }

      .checkbox {
        position: absolute;
        left: 650px;
        top: 5px;
        height: 20px;
        width: 20px;
      }

      span {
        position: absolute;
        left: 700px;
        top: 5px;
      }
    }

    .answer {
      position: absolute;
      top: 40px;
      font-size: large;
      width: 800px;

      p {
        position: absolute;
        left: 50px;
      }

      span {
        position: absolute;
        left: 150px;
      }

      textarea {
        position: absolute;
        top: 30px;
        left: 150px;
        resize: none;
      }

      input {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        left: 150px;
        top: 40px;
        height: 70px;
        width: 450px;
      }

      button {
        position: absolute;
        left: 500px;
        top: 60px;
        width: 70px;
        height: 30px;
      }
    }
  }

  .down {
    display: flex;
    justify-content: center;
    height: 300px;

    i {
      position: absolute;
      font-size: 30px;
      top: 180px;
      left: 620px;
    }

    .list {
      padding: 25px;
      position: absolute;
      top: 200px;

      th {
        background-color: gray;
        color: white;
        padding: 10px;
      }

      tr {
        .check {
          width: 30px;
        }

        .number {
          width: 60px;
        }

        .name {
          width: 250px;
        }

        .type {
          width: 100px;
        }

        .required {
          width: 50px;
        }

        .edit {
          width: 80px;
        }
      }

      td {
        background-color: rgb(227, 227, 227);
      }
    }
  }
}

.footer {
  position: relative;

  .before {
    position: absolute;
    width: 70px;
    height: 30px;
    left: 900px;
  }
  .before1 {
    position: absolute;
    width: 70px;
    height: 30px;
    left: 980px;
  }
}
</style>
