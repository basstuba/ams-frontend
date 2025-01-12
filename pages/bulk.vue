<template>
    <div class="bulk">
        <h2 class="bulk-title">一括登録</h2>
        <div class="bulk-content">
            <p class="bulk-message">csvファイルをインポートしてください</p>
            <validation-observer ref="obs" v-slot="ObserverProps">
                <form class="individual-form" @submit.prevent="ObserverProps.handleSubmit(fileUpLoad)" method="post">
                    <validation-provider v-slot="{ errors, validate }" rules="required|csv" name="csvファイル">
                        <div class="bulk-form__item">
                            <input class="item-input" type="file" @change="onChangeFile($event, validate)" accept=".csv" ref="fileInput">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <button class="bulk-form__button" type="submit">登録</button>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            selectedFile: null,
        };
    },
    methods: {
        onChangeFile(event, validate) {
            this.selectedFile = event.target.files[0];
            validate(event.target.files);
        },
        async fileUpLoad() {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(data.message);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    const { message, errors } = error.response.data;
                    let errorMessage = `${message}\n`;

                    errors.forEach((err) => {
                        errorMessage += `行 ${err.row} のエラー: ${err.errors.join(', ')}\n`;
                    });
                    alert(errorMessage);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        }
    },
}
</script>

<style scoped>
.bulk {
    text-align: center;
    padding: 2rem;
}

.bulk-title {
    font-size: 2rem;
    font-weight: 100;
}

.bulk-content {
    width: 50%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem 4rem;
    margin: 2rem auto;
}

.bulk-message {
    color: #4A4A4A;
    font-size: larger;
}

.bulk-form__item {
    position: relative;
    margin-top: 2rem;
}

.bulk-form__item::after {
    content: "クリックまたはドラッグアンドドロップ";
    position: absolute;
    color: #4A4A4A;
    font-size: large;
    pointer-events: none;
    top: 3rem;
    left: 8.5rem;
}

.item-input {
    width: 100%;
    color: #4A4A4A;
    background-color: #F9FAFB;
    border: 1px solid #2563EB;
    padding: 6rem 0 1rem 13.5rem;
    cursor: pointer;
}

.item-input::file-selector-button {
    display: none;
}

.bulk-form__button {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.5rem 4rem;
    cursor: pointer;
}

.bulk-form__button:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.error {
    color: #FF0202;
    margin: 1rem 0;
}
</style>