"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes_1 = __importDefault(require("./partes"));
const oportunidad_1 = __importDefault(require("./oportunidad"));
const oportunidadHistorico = connection_1.default.define('historicoOportunidades', {
    idhistoricoOportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricoOportunidades'
    },
    /*cantidad:{
        type: DataTypes.INTEGER,
    },
    precioUni:{
        type: DataTypes.INTEGER,
    },
    precioTotal:{
        type: DataTypes.INTEGER,
    },*/
    version: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    partes_idpartes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    oportunidades_idoportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
});
oportunidadHistorico.belongsTo(oportunidad_1.default, { foreignKey: 'oportunidades_idoportunidades', as: 'oportunidades' });
oportunidad_1.default.hasMany(oportunidadHistorico, { foreignKey: 'oportunidades_idoportunidades', as: 'historicoOportunidades' });
oportunidadHistorico.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasOne(oportunidadHistorico, { foreignKey: 'partes_idpartes', as: 'historicoOportunidades' });
exports.default = oportunidadHistorico;
