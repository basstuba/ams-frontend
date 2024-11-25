<template>
    <div class="login">
        <h2 class="login-title">ログイン</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
            <form class="login-form" @submit.prevent="ObserverProps.handleSubmit(login)">
                <validation-provider v-slot="{ errors }" rules="required|email">
                    <div class="login-item">
                        <img class="item-icon" src="../assets/images/mail.png" alt="メールアドレス" />
                        <input class="item-input" type="email" v-model="email" placeholder="email" name="メールアドレス"
                            autocomplete="email" />
                    </div>
                    <div class="error">&emsp;{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" rules="required|min:8">
                    <div class="login-item">
                        <img class="item-icon" src="../assets/images/key.png" alt="パスワード" />
                        <input class="item-input" type="password" v-model="password" placeholder="password" name="パスワード"
                            autocomplete="current-password" />
                    </div>
                    <div class="error">&emsp;{{ errors[0] }}</div>
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
                this.$router.push(this.$auth.user.role === 'admin' ? '/admin' : '/');
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

<style scoped>
.login {
    width: 40%;
    margin: 6rem auto;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem;
}

.login-title {
    font-size: xx-large;
    margin-bottom: 1rem;
}

.login-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
}

.item-icon {
    width: 10%;
    margin-right: 1rem;
}

.item-input {
    border: none;
    border-bottom: 0.1rem solid #000;
    font-size: larger;
    padding-top: 1rem;
    cursor: pointer;
}

.item-input:focus-visible {
    outline: 0;
}

.login-button {
    background-color: #A9F8FF;
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.3rem 3rem;
    margin-top: 1rem;
    cursor: pointer;
}

.login-button:hover {
    background-color: #00eaff;
}

.error {
    color: #FF0202;
}

@media screen and (max-width: 1024px) {
    .login {
        width: 50%;
    }
}

@media screen and (max-width: 820px) {
    .login {
        width: 60%;
        margin: 3rem auto;
    }
}

@media screen and (max-width: 431px) {
    .login {
        width: 70%;
    }

    .item-input {
        width: 70%;
        font-size: medium;
    }

    .error {
        font-size: small;
    }
}

@media screen and (max-width: 376px) {
    .login {
        width: 80%;
    }
}

@media screen and (max-width: 321px) {
    .login {
        width: 90%;
    }

    .login-title {
        font-size: x-large;
    }
}
</style>