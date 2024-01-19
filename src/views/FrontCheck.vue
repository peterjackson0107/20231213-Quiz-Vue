<script>
import { mapState,mapActions } from 'pinia';
import auth from '../stores/auth';
export default {
    data() {
    },
    computed: {
    ...mapState(auth,["getAuth","getuser"]), //帳號密碼
    },
methods: {
    inWeb() {
        let qDate = this.writerData.qDate;
        let qTitle = this.writerData.qTitle;
        let qText = this.writerData.qText;
        let name = this.writerData.name;
        let tel = this.writerData.tel;
        let email = this.writerData.email;
        let agee = parseInt(this.writerData.age);
        let dataArr =[];
        let data = this.writerData.value
        //每筆資料存進去就不會不見了
        if (JSON.parse(localStorage.getItem("data")) !== null) {
            dataArr = JSON.parse(localStorage.getItem("data"))
        } else {
            dataArr = [];
        }
        let dataObj = {
            // Data:this.userData,
            Date: qDate,
            Title: qTitle,
            Text: qText,
            personName: name,
            phone: tel,
            mail: email,
            age: agee,
            };
            // dataArr.push(dataObj)
            //將上述自訂的陣列dataObj推到最外面大的dataArr裡面
            dataArr.push(dataObj),
            //將dataArr放置在data裡面的json
            localStorage.setItem("data", JSON.stringify(dataArr))
        },
    
    }
}
</script>
<template>
    <div class="time">
        <p>問卷填寫時間</p>
        <span></span>
    </div>
    <div class="title">
        <p>問卷名稱</p>
        <span></span>
    </div>
    <div class="produce">
        <p>問卷介紹</p>
        <span></span>
    </div>
    <div class="content">
        <div class="information">
            <div class="one">
                <label>姓名：</label>
                <span></span>
            </div>
            <div class="two">
                <label>手機：</label>
                <span></span>
            </div>
            <div class="three">
                <label>E-mail：</label>
                <span></span>
            </div>
            <div class="four">
                <label>年齡：</label>
                <span></span>
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
            <RouterLink :to="`/FrontInside`" style="text-decoration: none; color: black;">修改</RouterLink>
        </button>
        <button type="submit" class="rounterItem" @click="inWeb">送出</button>
    </div>
</template>

<style scoped lang="scss">
p, label, span, input{
  color: #557;
  font-size: 24px;
}
.time {
    width: 40vw;
    height: 7vh;
    margin: 0 auto;
    font-size: 16px;
    border: 1px solid black;
}

.title {
    width: 40vw;
    height: 10vh;
    margin: 20px auto;
    font-size: 28px;
    border: 1px solid black
}

.produce {
    width: 40vw;
    height: 15vh;
    margin: 20px auto;
    font-size: 28px;
    border: 1px solid black
}

.content {
    display: flex;
    justify-content: center;

    .information {
        width: 40vw;
        height: 300px;
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