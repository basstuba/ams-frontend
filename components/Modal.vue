<template>
    <div class="modal">
        <button class="modal-button__close" @click="$emit('close')">閉じる</button>
        <table class="modal-table">
            <tr class="modal-data__title">
                <th class="title-name">休憩開始</th>
                <th class="title-name">休憩終了</th>
                <th class="title-name">休憩時間</th>
            </tr>
            <tr class="modal-data__item" v-for="rest in modalRestsData" :key="rest.id">
                <td class="item-detail">{{ rest.break_start }}</td>
                <td class="item-detail">{{ rest.break_end }}</td>
                <td class="item-detail">{{ rest.break_time }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        modalRestsData: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.modal {
    width: 100%;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: right;
    padding: 1rem;
}

.modal-button__close {
    color: #63594F;
    background-color: #FFD49F;
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    padding: 0.1rem 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

.modal-table {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
}

.title-name {
    color: #63594F;
    font-size: larger;
    text-align: left;
}

.item-detail {
    font-size: large;
    text-align: left;
    border-bottom: 0.1rem solid #94816A;
    padding: 0.5rem 0;
}
</style>