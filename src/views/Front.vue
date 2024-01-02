<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter'
export default {
    data(){
        return {
            searchText: "",
            searchStart: "",
            searchEnd: "",
            nowDate: "",
            startDate:"",
            endDate:"",
            quizList: [],
            questionStr:[],
        }
    },
    mounted(){
        this.searchQuestion();
    },
    created() {
    // 在組件被創建時獲取當前日期
    this.getNowDate();
    },
    methods: {
    ...mapActions(counter, ["createData"]),
    searchQuestion() {
        axios({
            url:"http://localhost:8080/quiz/search",
            method:"POST",
            headers:{"Content-Type":"application/json"},
            data:{
                quiz_name: this.searchText,   //名字要跟quizReq一樣
                start_date: this.searchStart,
                end_date: this.searchEnd,
                is_login: false,
            },
        })
//     .then( 這邊是錯誤的程式
//     res => console.log(res),
//     this.questionList = this.res.data.questionList,
//     console.log(this.questionList),
//   )
        .then(
            // 處理成功的情況
            (res) => {console.log(res);
                console.log(res.data.code)
                console.log(res.data.message)
                this.quizList = res.data.quizList;
                console.log(this.quizList);
                // this.quizList[0].questionStr=JSON.parse(this.quizList[0].questionStr);  //JSON 字串，轉為 Javascript 物件或是值
                this.quizList.forEach(element => {
                    // console.log(element);
                    element.questionStr=JSON.parse(element.questionStr);
                    // 在這裡初始化 selectedOption 為了單選題不要搞事
                    element.questionStr.forEach((question) => {
                        if (question.type === '單選題') {
                            question.selectedOption = '';
                        } else if (question.type === '多選題') {
                            question.selectedOption = [];
                        } else if (question.type === '簡答題') {
                            question.shortAnswer = '';
                        }});
                });
                console.log(this.quizList);
                // console.log(this.quizList[0].questionStr[0].title);
            })
            // 處理失敗的情況
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },
    getNowDate() {
        const today = new Date();
        // 西元年-月-日格式
        this.nowDate = today.toLocaleDateString('en-US'); 
        let dateObject = new Date(this.nowDate)
        this.nowDate = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1).toString().padStart(2, '0') + '-' + (dateObject.getDate()).toString().padStart(2, '0');
        console.log(this.nowDate);
    },
},
    computed: {
    ...mapState(counter, ["quizData"]),
  },
}
</script>
<template>
    <div class="header">
        <div class="content">
            <div class="contentup">
                <div class="content1">
                    <label for="questionName">問卷名稱：</label><br/>
                    <label for="time">統計時間：</label><br/>
                </div>
                <div class="content2">
                    <input type="text" id="" style="width: 660px; margin-top: 22px; font-size: 24px;" v-model="searchText"/><br/>
                    <input type="date" id="" style="font-size: 24px; margin-top: 39px;" v-model="searchStart"/>
                    <span style="margin-left: 30px ;">到</span>
                    <input type="date" id="" style="font-size: 24px; margin-top: 39px; margin-left:30px ;" v-model="searchEnd"/>
                    <button type="submit" @click="searchQuestion" style="margin-left: 30px ;"><span>搜尋</span></button><br/></div>
            </div>
            <div class="footer">
                <div class="list">
                    <table border="1" style="width: 50vw; margin: auto; color: #557;">
                        <thead style= "background-color: rgb(194, 190, 190);">
                            <tr>
                                <th class="number">編號</th>
                                <th class="name">名稱</th>
                                <th class="now">狀態</th>
                                <th class="start">開始時間</th>
                                <th class="end">結束時間</th>
                                <th class="result">結果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(quiz, index) in quizList" :key="index">
                            <td>{{ quiz.num }}</td>
                            <td>{{ quiz.name }}</td>
                            <td class="font state" v-if="quiz.startDate > this.nowDate">尚未開始</td>
                            <td class="font state" v-if="quiz.startDate <= this.nowDate && this.nowDate <= quiz.endDate">進行中</td>
                            <td class="font state" v-if="quiz.endDate < this.nowDate">已結束</td>
                            <td>{{ quiz.startDate }}</td>
                            <td>{{ quiz.endDate }}</td>
                            <!-- 按鈕 -->
                            <td><button type="button" data-bs-toggle="modal" :data-bs-target="'#quizModal' + index" style="border: 0; background-color: rgb(194, 190, 190);">查看</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 跳出視窗內容 -->
                <div class="modal fade" v-for="(quiz, index) in quizList" :key="index" :id="'quizModal' + index">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <span class="modal-title" id="quizModalLabel">{{ quiz.num }}. {{ quiz.name }} ({{ quiz.published? '已發佈':'未發佈' }})</span>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body modalBodyList">
                                <div class="modalBodyList1">
                                    <span>{{ quiz.startDate }} ~ {{ quiz.endDate }}</span><br>
                                </div>
                                <div class="modalBodyList2">
                                    <span>問卷說明: {{ quiz.description }}</span><br>
                                </div>
                                <!-- 顯示問卷的問題和選項 -->
                                <div class="modalBodyList3" v-for="(question, Index) in quiz.questionStr" :key="Index">
                                    <p>{{ Index + 1 }}. {{ question.title }} ({{ question.necessary ? '必填' : '選填' }})</p>
                                    <!-- 根據題目類型顯示不同的選項 -->
                                    <div v-if="question.type === '單選題'">
                                        <div v-for="(option, optionIndex) in question.option.split(', ')" :key="optionIndex">
                                            <input type="radio" :value="option" v-model="question.selectedOption" style="margin-left: 30px; margin-bottom: 20px;"/>
                                            <span style="margin-left: 20px;">{{ option }}</span>
                                        </div>
                                    </div>
                                    <div v-if="question.type === '多選題'">
                                        <div v-for="(option, oIndex) in question.option.split(', ')" :key="oIndex">
                                            <input type="checkbox" :value="option" v-model="question.selectedOption[oIndex]" style="margin-left: 30px; margin-bottom: 20px;"/>
                                            <span style="margin-left: 10px;">{{ option }}</span>
                                        </div>
                                    </div>
                                    <div v-if="question.type === '簡答題'">
                                        <textarea cols="60" rows="6" v-model="question.shortAnswer" style="resize: none; margin-left: 30px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
span, button, p, label, select, tr, td, th{
    font-family: "Montserrat", sans-serif;
    color: #557;
    font-size: 24px;
}
.content {
    width: 100%;
    height: 100%;
    
    .contentup {
        margin: 0 auto;
        border: 1px solid #557;;
        width: 50%;
        height: 25vh;
        display: flex;
        .content1 {
            width: 20%;
            font-size: 24px;
            text-align: right;
            line-height: 80px;
        }
        .content2 {
            width: 80%;
            text-align: left;
        }
    }
    .footer{
    width: 50%;
    height: 50%;
    margin: 20px auto 0 auto;

    .modalBodyList{
        width: 100%;
        .modalBodyList1{
            text-align: end;
        }
        .modalBodyList2{
            text-align: start;
            margin-bottom: 10px;
        }
        .modalBodyList3{
            width: 90%;
            text-align: start;
        }
    }
    .list{
        width: 50vw;
    }
    .pagination{
        justify-content: center;
        align-items: center;
    }
}
}


</style>