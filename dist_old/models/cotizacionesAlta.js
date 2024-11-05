"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const cotizacionesAlta = connection_1.default.define('cotizacionesAlta', {
    idcotizacionesAlta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizacionesAlta'
    },
    alta_idalta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'cotizacionesAlta',
});
/*cotizacionesAlta.belongsTo(Alta,{foreignKey:'Altas_idAltas'});
Alta.hasOne(Alta,{foreignKey:'Altas_idAltas'});
cotizacionesAlta.belongsTo(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});
Cotizacion.hasOne(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});*/
exports.default = cotizacionesAlta;
