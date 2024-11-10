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