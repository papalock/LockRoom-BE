"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExcelWorkbook = void 0;
const exceljs_1 = require("exceljs");
const createExcelWorkbook = async (audit_data) => {
    const workbook = new exceljs_1.Workbook();
    const worksheet = workbook.addWorksheet('AuditLogs');
    worksheet.columns = [
        { header: 'User', key: 'user_name' },
        { header: 'Viewed At', key: 'created_at' },
    ];
    audit_data.forEach((val) => {
        worksheet.addRow(val);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
exports.createExcelWorkbook = createExcelWorkbook;
//# sourceMappingURL=excel.utils.js.map