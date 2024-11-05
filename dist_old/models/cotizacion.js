"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const clientePlanta_1 = __importDefault(require("./clientePlanta"));
const Cotizacion = connection_1.default.define('cotizaciones', {
    idcotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizaciones'
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
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechafin: {
        type: sequelize_1.DataTypes.DATE,
    },
    fechaActualizacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    fechaColocacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    moneda: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipoCambio: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    probabilidad: {
        type: sequelize_1.DataTypes.INTEGER,
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
    tableName: 'cotizaciones',
});
Cotizacion.belongsTo(clientePlanta_1.default, { foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta' });
clientePlanta_1.default.hasOne(Cotizacion, { foreignKey: 'clientePlanta_idclientePlanta', as: 'cotizacion' });
exports.default = Cotizacion;
