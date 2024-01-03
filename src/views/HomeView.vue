<script>
</script>

<template>
    <div class="header">
        <p>動態問卷 啟動</p>
        <button><RouterLink :to="`/Front`" class="rounterItem" style="text-decoration: none; color: #557; font-size: 24px;"><span>前台</span></RouterLink></button> 
        <button style=" margin-left: 50px;"><RouterLink :to="`/Back`" class="rounterItem" style="text-decoration: none; color: #557; font-size: 24px;"><span>後台</span></RouterLink></button>
        <button style=" margin-left: 50px; text-decoration: none; color: #557; font-size: 24px;"><span>登入</span></button> 
    </div>
    <div class="footer">
        <div class="loginPage">
            <div class="loginLeft">
                <label for="">Account</label><br>
                <label for="">Password</label>
            </div>
            <div class="loginRight">
                <input type="text" placeholder="A01"><br>
                <input type="password" placeholder="AA123">
            </div>
        </div>
        <button type="submit" class="sumBtn">Log In</button>
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
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;;
        .loginLeft{

        }
        .loginRight{

        }
    }
}
</style>
