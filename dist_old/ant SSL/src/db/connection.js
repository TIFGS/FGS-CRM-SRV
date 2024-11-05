"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('forzaglo_crm', 'forzaglo_crm', 'M#1j58bg9', {
    host: 'forzaglobal.com',
    port: 3306,
    dialect: 'mysql',
    logging: false, // Puedes habilitar los logs si lo deseas
});
exports.default = sequelize;
