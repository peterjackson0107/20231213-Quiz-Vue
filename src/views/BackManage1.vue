<script>
export default {
    data(){

    },
}
</script>
<template>
        <div class="header">
        <RouterLink to="/BackManage1" class="link">問卷</RouterLink>
        <RouterLink to="/BackManage2" class="link">題目</RouterLink>
        <RouterLink to="/BackManage3" class="link">問卷回饋</RouterLink>
        <RouterLink to="/BackManage4" class="link">問卷確認</RouterLink>
    </div>
    <div class="content">
        <span>問卷名稱：</span>
        <input type="text" name="" id="">
        <br>
        <span>問卷說明：</span>
        <input type="text" name="" id="">
        <br>
        <span>開始時間：</span>
        <input type="date" name="" id="" class="time">
        <br>
        <span>結束時間：</span>
        <input type="date" name="" id="" class="time">
    </div>
    <div class="footer">
        <button type="submit"><RouterLink :to="`/Back`" class="rounterItem">取消</RouterLink></button>
        <button type="submit"><RouterLink :to="`/BackManage2`" class="rounterItem">下一步</RouterLink></button>
    </div>

</template>

<style scoped lang="scss">
.header{
    width: 90vw;
    height: 8vh;
    display: flex;
    justify-content: center;
    .link{
        text-decoration: none;
        margin-left: 10px;
    }
}
.content{
    span{
        width: 30%;
        height: 20%;
        margin-right: 30px;
    }
    input{
        width: 70%;
        height: 20%;
        margin-bottom: 30px;
    }
    .time{
        width: 30%;
        margin-right: 40%;
    }
}
.footer{
    position: absolute;
    top: 55%;
    right: 25%;
    button{
        margin-left: 20px;
    }
    .rounterItem{
        text-decoration: none;
    }
}
</style>