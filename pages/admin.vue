<template>
    <div class="menu">
        <h2 class="menu-title">メニュー</h2>
        <NuxtLink class="menu-link" to="/daily">日付別勤怠一覧</NuxtLink>
        <NuxtLink class="menu-link" to="/allUser">個人別勤怠一覧</NuxtLink>
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
    padding: 2rem;
    margin: 8rem auto;
}

.menu-title {
    font-size: xx-large;
    margin-bottom: 1rem;
}

.menu-link {
    display: block;
    text-decoration: none;
    font-size: 2.5rem;
    color: #63594F;
    margin-top: 2rem;
}

@media screen and (max-width: 1024px) {
    .menu {
        width: 50%;
    }
}

@media screen and (max-width: 768px) {
    .menu-title {
        font-size: x-large;
    }

    .menu-link {
        font-size: 2rem;
    }
}
</style>