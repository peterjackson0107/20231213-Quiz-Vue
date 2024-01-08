import { defineStore } from "pinia";

export default defineStore(

    "data", {
    //data(){}
    state() {
        return {
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
        // setData(data) { //前台填寫問卷
        //     this.writerData = data;
        // },
        // createData(data1) { //後台建立問卷
        //     this.quizData = data1;
        // },
    }
}
)