<template>
    <div class="registration">
        <h2 class="registration-title">従業員登録方法選択</h2>
        <NuxtLink class="registration-link" to="/individual">個別登録</NuxtLink>
        <NuxtLink class="registration-link" to="/bulk">一括登録</NuxtLink>
    </div>
</template>

<script>
export default {
    layout: 'another',
};
</script>

<style scoped>
.registration {
    width: 30%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem;
    margin: 6rem auto;
}

.registration-title {
    font-size: xx-large;
    margin-bottom: 2rem;
}

.registration-link {
    display: block;
    text-decoration: none;
    font-size: xx-large;
    color: #4A4A4A;
    margin: 1.5rem 0;
}

@media screen and (max-width: 1024px) {
    .registration {
        width: 40%;
    }
}

@media screen and (max-width: 926px) {
    .registration {
        width: 50%;
    }
}

@media screen and (max-width: 820px) {
    .registration-title {
        font-size: x-large;
    }

    .registration-link {
        font-size: x-large;
    }
}

@media screen and (max-width: 768px) {
    .registration {
        margin: 5rem auto;
    }
}
</style>