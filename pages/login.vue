<template>
    <div class="login">
        <h2 class="login-title">ログイン</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
            <form class="login-form" @submit.prevent="ObserverProps.handleSubmit(login)">
                <validation-provider v-slot="{ errors }" rules="required|email">
                    <div class="login-item">
                        <img class="item-icon" src="require('@assets/images/mail.png')" alt="メールアドレス" />
                        <input class="item-input" type="email" v-model="email" placeholder="email" name="メールアドレス"
                            autocomplete="email" />
                    </div>
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" rules="required|min:8">
                    <div class="login-item">
                        <img class="item-icon" src="require('@assets/images/key.png')" alt="パスワード" />
                        <input class="item-input" type="password" v-model="password" placeholder="password" name="パスワード"
                            autocomplete="current-password" />
                    </div>
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <button class="login-button" type="submit">ログイン</button>
            </form>
        </validation-observer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('laravelJWT', {
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                });
                this.$router.push('/');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
    },
};
</script>