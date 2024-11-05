"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Factura = connection_1.default.define('factura', {
    idfactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idfactura'
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechaini: {
        type: sequelize_1.DataTypes.DATE,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechafin: {
        type: sequelize_1.DataTypes.DATE,
    },
    probabilidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    clientePlanta_idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'factura',
});
exports.default = Factura;
