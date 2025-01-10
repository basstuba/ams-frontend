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
    color: #fff;
    background: linear-gradient(to bottom, #767676 30%, #272727 90%);
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: larger;
    padding: 0.3rem 1rem;
    cursor: pointer;
}

.export-button:hover {
    background: linear-gradient(to bottom, #b2b2b2 30%, #4c4c4c 90%);
}

@media screen and (max-width: 820px) {
    .export-button {
        font-size: medium;
    }
}
</style>