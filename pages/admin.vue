<template>
    <div class="menu">
        <h2 class="menu-title">メニュー</h2>
        <div class="menu-item">
            <div class="menu-item__title">勤怠管理</div>
            <div class="menu-item__link">
                <NuxtLink class="menu-link" to="/daily">日付別勤怠一覧</NuxtLink>
                <NuxtLink class="menu-link" to="/allUser">個人別勤怠一覧</NuxtLink>
            </div>
        </div>
        <div class="menu-item">
            <div class="menu-item__title">従業員管理</div>
            <div class="menu-item__link">
                <NuxtLink class="menu-link" to="/employee-registration">従業員登録</NuxtLink>
                <NuxtLink class="menu-link" to="/information-change">従業員情報変更</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
};
</script>

<style scoped>
.menu {
    width: 40%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem 4rem;
    margin: 6rem auto;
}

.menu-title {
    font-size: x-large;
    margin-bottom: 1rem;
}

.menu-item__title {
    font-size: x-large;
    color: #4A4A4A;
    background-color: #F1F1F1;
}

.menu-item__link {
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-link {
    width: 50%;
    display: block;
    text-decoration: none;
    font-size: x-large;
    color: #4A4A4A;
    margin: 1.5rem 0;
}

@media screen and (max-width: 1024px) {
    .menu {
        width: 60%;
    }
}

@media screen and (max-width: 926px) {
    .menu {
        width: 70%;
    }
}

@media screen and (max-width: 820px) {
    .menu-title {
        font-size: large;
    }

    .menu-item__title {
        font-size: large;
    }

    .menu-link {
        font-size: large;
    }
}

@media screen and (max-width: 768px) {
    .menu {
        margin: 5rem auto;
    }
}
</style>