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