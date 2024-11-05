"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const factura_1 = __importDefault(require("./factura"));
const facturaActividad = connection_1.default.define('actividadesFactura', {
    idactividadesFactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesFactura'
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechacrea: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecharecord: {
        type: sequelize_1.DataTypes.DATE,
    },
    factura_idfactura: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'actividadesFactura',
});
facturaActividad.belongsTo(factura_1.default, { foreignKey: 'factura_idfactura', as: 'factura' });
factura_1.default.hasMany(facturaActividad, { foreignKey: 'factura_idfactura', as: 'actividadesFacturas' });
exports.default = facturaActividad;
