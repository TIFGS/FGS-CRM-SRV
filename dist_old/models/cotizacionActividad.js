"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const cotizacion_1 = __importDefault(require("./cotizacion"));
const cotizacionActividad = connection_1.default.define('actividadesCotizaciones', {
    idactividadesCotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesCotizaciones'
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
    cotizaciones_idcotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'actividadesCotizaciones',
});
cotizacionActividad.belongsTo(cotizacion_1.default, { foreignKey: 'cotizaciones_idcotizaciones', as: 'cotizacion' });
cotizacion_1.default.hasMany(cotizacionActividad, { foreignKey: 'cotizaciones_idcotizaciones', as: 'actividadesCotizaciones' });
exports.default = cotizacionActividad;
