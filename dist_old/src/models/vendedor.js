"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const vendedor = connection_1.default.define('vendedor', {
    idvendedor: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvendedor'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'vendedor',
});
exports.default = vendedor;
