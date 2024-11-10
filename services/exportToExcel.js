import * as XLSX from 'xlsx';

export function exportToExcel(data, fileName = 'data.xlsx') {
    const filteredData = data.map(work => ({
        name: work.user.name,
        work_start: work.work_start,
        work_end: work.work_end,
        break_total: work.break_total,
        work_time: work.work_time
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

    XLSX.writeFile(workbook, fileName);
}