"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const altaFactura = connection_1.default.define('altaFactura', {
    idaltaFactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idaltaFactura'
    },
    alta_idalta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    factura_idfactura: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'altaFactura',
});
exports.default = altaFactura;
