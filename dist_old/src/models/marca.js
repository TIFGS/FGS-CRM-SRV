"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const marca = connection_1.default.define('marca', {
    idmarca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idmarca'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipoIndustria: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'marca',
});
exports.default = marca;
