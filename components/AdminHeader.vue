<template>
    <div class="header">
        <div class="header-title">
            <h1 class="title-logo">管理画面</h1>
        </div>
        <nav class="header-nav">
            <div class="link-nav">
                <NuxtLink class="link-admin" to="/admin">メニュー</NuxtLink>
            </div>
            <div class="logout-nav">
                <button class="logout" @click="logout">ログアウト</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            try {
                await this.$auth.logout();
                this.$router.push('/login');
            } catch (error) {
                const errorMessage = error.message || "予期せぬエラーが発生しました。再度お試しください。";
                alert(`ログアウトに失敗しました: ${errorMessage}`);
            }
        },
    },
};
</script>