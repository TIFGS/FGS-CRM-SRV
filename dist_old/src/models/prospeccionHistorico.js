"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes_1 = __importDefault(require("./partes"));
const prospeccion_1 = __importDefault(require("./prospeccion"));
const prospeccionHistorico = connection_1.default.define('historicosProspecciones', {
    idhistoricosProspecciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosProspecciones'
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    /*precioUni:{
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
    prospecciones_idprospecciones: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosProspecciones'
});
prospeccionHistorico.belongsTo(prospeccion_1.default, { foreignKey: 'prospecciones_idprospecciones', as: 'prospeccion' });
prospeccion_1.default.hasMany(prospeccionHistorico, { foreignKey: 'prospecciones_idprospecciones', as: 'historicosProspecciones' });
prospeccionHistorico.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasOne(prospeccionHistorico, { foreignKey: 'partes_idpartes', as: 'historicosProspecciones' });
exports.default = prospeccionHistorico;
