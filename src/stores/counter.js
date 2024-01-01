import { defineStore } from "pinia";

export default defineStore("counter", {
    //data(){}
    state() {
        return {
            writerData: {
                qDate:"",
                qTitle:"",
                qText:"",
                name: "",
                tel: "",
                email: "",
                age: 0,
            },
            quizData: {
                name:"",
                description:"",
                startDate:"",
                endDate: "",
                qAnswer:[],
            }
        }

    },
    //computed
    getters: {
        locationInfo(state) {
            return `現在位置:${this.location}`
        }

    },
    //methods
    actions: {
        setData(data) { //前台填寫問卷
            this.writerData = data;
        },
        createData(data1) { //後台建立問卷
            this.quizData = data1;
        },
        }
    }
)
//  pinia用的import
// import { mapState, mapActions } from 'pinia'
// import counter from '../stores/counter'

// 存入問卷的陣列到 f12應用程式的本機儲存空間
//  data為key值
//localStorage.setItem("data",JSON.stringify(this.userData))

//取出obj並印出陣列
//let obj = localStorage.getItem("data")
// console.log(JSON.parse(obj));