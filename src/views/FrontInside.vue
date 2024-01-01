<script>
import check from "../views/FrontCheck.vue";
import { computed } from "vue";
import { ref, provide } from "vue";
import { mapState, mapActions } from "pinia";
import counter from "../stores/counter";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(counter, ["setData"]),
  },
  components: {
    check,
  },
  // provide() {
  //     return {
  //         nameIn: computed(() => this.name),
  //         telIn: computed(() => this.tel),
  //         emailIn: computed(() => this.email),
  //         ageIn: computed(() => this.age),
  //     }
  // },
  computed: {
    ...mapState(counter, ["writerData"]),
  },
};
</script>

<template>
  <div class="question">
    <div class="time">
      <p>問卷填寫時間</p>
      <input type="time" v-model="this.writerData.qDate" />
    </div>
    <div class="title">
      <p>問卷名稱</p>
      <input type="text" class="titleIn" v-model="this.writerData.qTitle" />
    </div>
    <div class="produce">
      <p>問卷說明</p>
      <textarea name="" id="" cols="10" rows="10" v-model="this.writerData.qText"></textarea>
    </div>
    <div class="content">
      <div class="information">
        <div class="one">
          <label>姓名：</label>
          <input type="text" required name="name" id="name" v-model="this.writerData.name"/>
        </div>
        <div class="two">
          <label>手機：</label>
          <input type="tel" required name="tel" id="tel" v-model="this.writerData.tel"/>
        </div>
        <div class="three">
          <label>E-mail：</label>
          <input type="email" required name="email" id="email" v-model="this.writerData.email"/>
        </div>
        <div class="four">
          <label>年齡：</label>
          <input type="number" required name="age" id="age" v-model="this.writerData.age"/>
        </div>
      </div>
      <div class="question">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
      </div>
    </div>
    <div class="footer">
      <button type="submit" class="rounterItem">
        <RouterLink :to="`/Front`" style="text-decoration: none;"><span>取消</span></RouterLink>
      </button>
      <button type="submit" class="rounterItem" @click="">
        <RouterLink :to="`/FrontCheck`" style="text-decoration: none;"><span>送出</span></RouterLink>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
p, label, span, input{
  color: #557;
  font-size: 24px;
}
.question {
  justify-content: center;
  align-items: center;
}
.time {
  width: 40vw;
  height: 10vh;
  margin: 0 auto;
  font-size: 16px;
  border: 1px solid black;
}

.title {
  width: 40vw;
  height: 15vh;
  margin: 20px auto;
  font-size: 28px;
  border: 1px solid black;

  .titleIn {
    width: 50%;
    height: 5vh;
    font-size: 20px;
  }
}

.produce {
  width: 40vw;
  height: 20vh;
  margin: 20px auto;
  font-size: 28px;
  color: #557;
  border: 1px solid black;
}

textarea {
  width: 80%;
  height: 10vh;
  resize: none;
}

.content {
  display: flex;
  justify-content: center;

  .information {
    width: 40vw;
    height: 30vh;
    border: 1px solid black;
    font-size: large;
    position: relative;

    span {
      width: 70px;
      position: absolute;
      left: 50px;
    }
    input {
      position: absolute;
      width: 500px;
      height: 25px;
      left: 200px;
    }
    .one {
      position: absolute;
      top: 20px;
    }
    .two {
      position: absolute;
      top: 80px;
    }
    .three {
      position: absolute;
      top: 140px;
    }
    .four {
      position: absolute;
      top: 200px;
    }
  }
}

.footer {
  .rounterItem {
    margin-left: 10px;
    text-decoration: none;
  }
}
</style>
