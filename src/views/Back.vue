<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter'
export default {
    data(){
        return {
            //模糊搜尋
            searchText: "",
            searchStart: "",
            searchEnd: "",
            nowDate: "",
            startDate:"",
            endDate:"",
            //資料庫所有抓到的問卷
            quizList: [],
            questionStr:[],
            //處理quizList的分頁
            currentPage: 1,
            // itemsPerPage: 5, //一個分頁要多少問卷
            itemsPerPage: Math.ceil(Math.random()*10), //一個分頁要多少問卷
        }
    },
    created() {
    // 在組件被創建時獲取當前日期
    this.getNowDate();
    },
    mounted(){
    this.searchQuestion();
    },
    methods: {
    ...mapActions(counter, ["createData"]),
    searchQuestion() {
        axios({
            url:"http://localhost:8080/quiz/search",
            method:"POST",
            headers:{"Content-Type":"application/json"},
            data:{
                quiz_name: this.searchText,
                start_date: this.searchStart,
                end_date: this.searchEnd,
                is_login: true,
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
                this.quizList.sort((a, b) => b.num - a.num);
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
                //呼叫分頁的方法
                // this.paginationQuizlist();
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
    //處理quizList的分頁
    paginationQuizlist() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.quizList.slice(startIndex, endIndex);
    },
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
                    <p style="margin-right: 50px;">{{ this.itemsPerPage }}</p>
                </div>
                <div class="content2">
                    <input type="text" id="searchText" style="width: 660px; margin-top: 22px; font-size: 24px;" v-model="searchText"/><br/>
                    <input type="date" id="searchStart" style="font-size: 24px; margin-top: 39px;" v-model="searchStart"/>
                    <span style="margin-left: 30px ;">到</span>
                    <input type="date" id="searchEnd" style="font-size: 24px; margin-top: 39px; margin-left:30px ;" v-model="searchEnd"/>
                    <button type="submit" @click="searchQuestion()" style="margin-left: 30px ;"><span>搜尋</span></button><br/>
                    <button style=" margin-top: 30px;"><i class="fa-solid fa-trash-can" style=" font-size: 30px;"></i></button>
                    <button style=" margin-top: 30px; margin-left:30px ;"><RouterLink :to="`/BackManage`" class="rounterItem" style="text-decoration: none; color: #557;"><i class="fa-solid fa-plus" style=" font-size: 30px;"></i></RouterLink></button>
                </div>
            </div>
            <div class="footer">
                <div class="list">
                    <table border="1" style="width: 50vw; margin: auto; color: #557;">
                        <thead style= "background-color: rgb(194, 190, 190);">
                            <tr>
                                <th class="check"></th>
                                <th class="number">編號</th>
                                <th class="name">名稱</th>
                                <th class="now">狀態</th>
                                <th class="start">開始時間</th>
                                <th class="end">結束時間</th>
                                <th class="result">結果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(quiz, index) in paginationQuizlist" :key="index">
                                <td><input type="checkbox" /></td>
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
                <button @click="currentPage -= 1" :disabled="currentPage === 1" style="margin-right: 10px;"><span>上一頁</span></button>
                <span>{{ currentPage }}</span>
                <button @click="currentPage += 1" :disabled="currentPage * itemsOfOnePage >= quizList.length" style="margin-left: 10px;"><span>下一頁</span></button>
            </div>
            <!-- 跳出視窗內容 -->
            <div class="modal fade" v-for="(quiz, index) in paginationQuizlist" :key="index" :id="'quizModal' + index">
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
                                    <span>{{ quiz.description }}</span><br>
                                </div>
                                <!-- 顯示問卷的問題和選項 -->
                                <div class="modalBodyList3" v-for="(question, Index) in quiz.questionStr" :key="Index">
                                    <p>{{ Index + 1 }}. {{ question.title }} ({{ question.necessary ? '必填' : '選填' }})</p>
                                    <!-- 根據題目類型顯示不同的選項 -->
                                    <div v-if="question.type === '單選題'">
                                        <div v-for="(option, optionIndex) in question.option.split(', ')" :key="optionIndex">
                                            <input type="radio" :value="option" disabled="disabled" v-model="question.selectedOption" style="margin-left: 30px; margin-bottom: 20px;"/>
                                            <span style="margin-left: 20px;">{{ option }}</span>
                                        </div>
                                    </div>
                                    <div v-if="question.type === '多選題'">
                                        <div v-for="(option, oIndex) in question.option.split(', ')" :key="oIndex">
                                            <input type="checkbox" :value="option" disabled="disabled" v-model="question.selectedOption[oIndex]" style="margin-left: 30px; margin-bottom: 20px;"/>
                                            <span style="margin-left: 10px;">{{ option }}</span>
                                        </div>
                                    </div>
                                    <div v-if="question.type === '簡答題'">
                                        <textarea cols="120" rows="10" disabled="disabled" v-model="question.shortAnswer" style="resize: none; margin-left: 30px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    .modalBodyList{
        width: 100%;
        .modalBodyList1{
            text-align: end;
        }
        .modalBodyList2{
            text-align: center;
            margin-bottom: 10px;
        }
        .modalBodyList3{
            width: 100%;
            text-align: start;
        }
    }
    .footer{
    width: 50%;
    height: 50%;
    margin: 20px auto 0 auto;
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