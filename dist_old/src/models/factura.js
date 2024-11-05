"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const clientePlanta_1 = __importDefault(require("./clientePlanta"));
const Factura = connection_1.default.define('factura', {
    idfactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idfactura'
    },
    numero: {
        type: sequelize_1.DataTypes.INTEGER,
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
    fechaColocacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    probabilidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    productOrder: {
        type: sequelize_1.DataTypes.STRING,
    },
    contrato: {
        type: sequelize_1.DataTypes.STRING,
    },
    numeroAlta: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    peso: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    parcialidad: {
        type: sequelize_1.DataTypes.STRING,
    },
    conceptoFactura: {
        type: sequelize_1.DataTypes.STRING,
    },
    terminoPago: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    otro: {
        type: sequelize_1.DataTypes.STRING,
    },
    adenda: {
        type: sequelize_1.DataTypes.STRING,
    },
    impuestos: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    comision: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ganancia: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    clientePlanta_idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'factura',
});
Factura.belongsTo(clientePlanta_1.default, { foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta' });
clientePlanta_1.default.hasOne(Factura, { foreignKey: 'clientePlanta_idclientePlanta', as: 'factura' });
exports.default = Factura;
