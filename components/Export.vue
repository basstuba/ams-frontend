<template>
    <div class="export">
        <button class="export-button" @click="outputExcel">エクセルに出力</button>
    </div>
</template>

<script>
import { exportToExcel } from '../services/exportToExcel';
export default {
    props: {
        exportWorkData: {
            type: Array,
            required: true,
        },
        exportDate: {
            type: String,
            required: true,
        }
    },
    methods: {
        outputExcel() {
            const fileName = `${this.exportDate}.xlsx`;
            exportToExcel(this.exportWorkData, fileName);
        },
    },
};
</script>

<style scoped>
.export-button {
    background-color: #FFD49F;
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.3rem 1rem;
    cursor: pointer;
}
</style>