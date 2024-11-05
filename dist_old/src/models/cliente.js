"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Cliente = connection_1.default.define('cliente', {
    idcliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcliente'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    extension: {
        type: sequelize_1.DataTypes.STRING,
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'cliente',
});
exports.default = Cliente;
