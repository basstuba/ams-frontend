<template>
    <div class="header">
        <div class="header-title">
            <h1 class="title-logo">管理画面</h1>
        </div>
        <nav class="header-nav">
            <div class="link-back" v-if="$route.path.startsWith('/monthly/')">
                <NuxtLink class="link__all-user" to="/allUser">個人別勤怠一覧</NuxtLink>
            </div>
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

<style scoped>
.header {
    background-color: #FFEACE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.header-nav {
    display: flex;
    justify-content: center;
    align-items: center;
}

.link-back {
    margin-right: 1.5rem;
}

.link__all-user {
    text-decoration: none;
    color: #000;
}

.link-admin {
    text-decoration: none;
    color: #000;
}

.logout {
    background-color: #FFEACE;
    border: none;
    margin-left: 1rem;
    cursor: pointer;
}
</style>