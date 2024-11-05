"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const cotizacionesPrealta = connection_1.default.define('cotizacionesPrealta', {
    idcotizacionesPrealta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizacionesPrealta'
    },
    prealta_idPreAlta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'cotizacionesPrealta',
});
/*cotizacionesPrealta.belongsTo(Prealta,{foreignKey:'prealta_idPreAlta'});
cotizacionesPrealta.belongsTo(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});
Prealta.hasOne(Prealta,{foreignKey:'prealta_idPreAlta'});
Cotizacion.hasOne(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});*/
exports.default = cotizacionesPrealta;
