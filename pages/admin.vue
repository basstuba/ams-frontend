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