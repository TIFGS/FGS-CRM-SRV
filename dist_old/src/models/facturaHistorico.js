"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes_1 = __importDefault(require("./partes"));
const factura_1 = __importDefault(require("./factura"));
const facturaHistorico = connection_1.default.define('historicosFactura', {
    idhistoricosFactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosFactura'
    },
    parteCliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    UMedida: {
        type: sequelize_1.DataTypes.STRING,
    },
    cantidad: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    precioUni: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    precioTotal: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    version: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    partes_idpartes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    factura_idfactura: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosFactura',
});
facturaHistorico.belongsTo(factura_1.default, { foreignKey: 'factura_idfactura', as: 'factura' });
factura_1.default.hasMany(facturaHistorico, { foreignKey: 'factura_idfactura', as: 'historicosFacturas' });
facturaHistorico.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasOne(facturaHistorico, { foreignKey: 'partes_idpartes', as: 'historicosFacturas' });
exports.default = facturaHistorico;
