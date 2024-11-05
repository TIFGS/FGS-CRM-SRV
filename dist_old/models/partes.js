"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes = connection_1.default.define('partes', {
    idpartes: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idpartes'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    medidas: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipomaterial: {
        type: sequelize_1.DataTypes.STRING,
    },
    proyecto_idproyecto: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'partes',
});
exports.default = partes;
