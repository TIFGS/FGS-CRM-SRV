"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const prospeccionesCotizaciones = connection_1.default.define('prospeccionesCotizaciones', {
    idoportunidadesProspecciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idoportunidadesProspecciones'
    },
    prospecciones_idprospecciones: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    oportunidades_idoportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'prospeccionesCotizaciones',
});
exports.default = prospeccionesCotizaciones;
