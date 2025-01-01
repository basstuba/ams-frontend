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
                alert(`ログアウトに失敗しました: ${errorMessage}`);
            }
        },
    },
};
</script>

<style scoped>
.header {
    background-color: #1A73E8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.title-logo {
    color: #fff;
}

.link-register,
.link-login {
    text-decoration: none;
    color: #fff;
    margin: 0 0.5rem;
}

.logout {
    border: none;
    background-color: #1A73E8;
    color: #fff;
    cursor: pointer;
}

@media screen and (max-width: 431px) {
    .title-logo {
        font-size: large;
    }

    .link-register,
    .link-login,
    .logout {
        font-size: small;
    }
}

@media screen and (max-width: 376px) {
    .header {
        padding: 1rem;
    }
}

@media screen and (max-width: 321px) {
    .header {
        padding: 1rem 0.5rem;
    }

    .link-register,
    .link-login {
        margin: 0 0.3rem;
    }
}
</style>