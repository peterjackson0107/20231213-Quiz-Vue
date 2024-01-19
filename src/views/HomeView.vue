<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia'
import auth from '../stores/auth'
import Swal from "sweetalert2";
export default {
    data(){
        return {
            //login
            account:"",
            password:"",
        }
    },
    created() {
    },
    mounted(){
    },
    methods: {
    ...mapActions(auth, ["createData"]),
    login(){
        axios({
            url:"http://localhost:8080/api/login",
            method:"POST",
            headers:{"Content-Type":"application/json"},
            data:{
                account: this.account, //名字要跟quizReq一樣
                password: this.password,
            },
        })
        .then(
            // 處理成功的情況
            (res) => {
                console.log(res);
                console.log(res.data.rtncode);
                console.log(res.data.message);
                this.$router.push("/Back");
                this.showAlert();
            })
            // 處理失敗的情況
        .catch((error) => {
            console.error("Error fetching data:", error);
            this.showAlert1()
            });
        },
    showAlert() {
        Swal.fire({
            title: "成功!!!",
            text: "登入成功!!!",
            icon: "success",
            });
        },
    showAlert1() {
        Swal.fire({
            title: "失敗!!!",
            text: "登入失敗!!!",
            icon: "question",
            });
        },
    },
    computed: {
    },
}
</script>

<template>
    <div class="header">
        <p>動態問卷 啟動</p>
        <button><RouterLink :to="`/Front`" class="rounterItem" style="text-decoration: none; color: #557; font-size: 24px;"><span>前台</span></RouterLink></button> 
        <button style=" margin-left: 50px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557; font-size: 24px;"><span>後台</span></RouterLink></button>
    </div>
    <div class="footer">
        <div class="loginPage">
            <div class="loginLeft">
                <label for="" style="color: #557; font-size: 24px;">Account：</label><br>
                <label for="" style="color: #557; font-size: 24px;">Password：</label>
            </div>
            <div class="loginRight">
                <input type="text" placeholder="A02" v-model="account" style="color: #557; font-size: 24px;"><br>
                <input type="password" placeholder="AA123" v-model="password" style="color: #557; font-size: 24px; margin-top: 25px;">
            </div>
        </div>
        <button type="submit" class="sumBtn" @click="login()" style="color: #557; font-size: 24px;">登入</button>
    </div>

</template>

<style scoped lang="scss">
.header {
    width: 100vw;
    height: 15vh;
    margin: 0 auto;
    p {
        color: #557;
        font-size: 50px;
        background: linear-gradient( 135deg, #59ae6a, #48ae96, #60d9ec, #65a5d5, #9491e0, #c382a4 );
        position: relative;
        overflow: hidden;
    }
    p::before {
        content: "";
        position: absolute;
        width: 50px;
        height: calc(200% * 1.4142 + 20px);
        top: calc(-100% * 1.4142 - 20px);
        left: calc(-10px * 1.4142);
        background-color: rgba(255, 255, 255, 0.3);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-animation: blink 5s linear infinite;
        -o-animation: blink 5s linear infinite;
        animation: blink 5s linear infinite;
    }
    @keyframes blink {
        0% {
            top: calc(-100% * 1.4142);
            left: calc(-30px * 1.4142);
        }
        to {
            top: calc(-20px * 1.4142);
            left: calc(100% + 10px * 1.4142);
        }
    }
}
.footer{
    width: 100vw;
    height: 85vh;
    margin: 0 auto;
    .loginPage {
        width: 100%;
        height: 25%;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;;
        .loginLeft{
            line-height: 60px;
            text-align: right;
        }
    }
}
</style>
