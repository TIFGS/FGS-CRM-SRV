"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const cotizacion_1 = __importDefault(require("./cotizacion"));
const partes_1 = __importDefault(require("./partes"));
const cotizacionHistorico = connection_1.default.define('historicosCotizaciones', {
    idhistoricosCotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosCotizaciones'
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    cantidad: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    precioUni: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    UMedida: {
        type: sequelize_1.DataTypes.STRING,
    },
    Tooling: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Replica: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Prototipo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Flete: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Dibujo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Desarrollo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ReplicaMateriales: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ReplicaObra: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Empaque: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Validacion: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    precioTotal: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    version: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    partes_idpartes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosCotizaciones',
});
cotizacionHistorico.belongsTo(cotizacion_1.default, { foreignKey: 'cotizaciones_idcotizaciones', as: 'cotizacion' });
cotizacion_1.default.hasMany(cotizacionHistorico, { foreignKey: 'cotizaciones_idcotizaciones', as: 'historicosCotizaciones' });
cotizacionHistorico.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasMany(cotizacionHistorico, { foreignKey: 'partes_idpartes', as: 'historicosCotizaciones' });
exports.default = cotizacionHistorico;
