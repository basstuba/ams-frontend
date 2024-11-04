<template>
    <div class="header">
        <div class="header-title">
            <h1 class="title-logo">勤怠管理システム</h1>
        </div>
        <nav class="header-nav">
            <div class="register-login__nav" v-if="!$auth.loggedIn">
                <NuxtLink class="link-register" to="/register">新規登録</NuxtLink>
                <NuxtLink class="link-login" to="/login">ログイン</NuxtLink>
            </div>
            <div class="logout-nav" v-else>
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
                alert(`エラーが発生しました: ${errorMessage}`);
            }
        },
    },
};
</script>