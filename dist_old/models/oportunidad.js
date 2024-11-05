"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const clientePlanta_1 = __importDefault(require("./clientePlanta"));
const Oportunidad = connection_1.default.define('oportunidades', {
    idoportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idoportunidades'
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    numero: {
        type: sequelize_1.DataTypes.INTEGER,
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
    probabilidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    clientePlanta_idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'oportunidades',
});
Oportunidad.belongsTo(clientePlanta_1.default, { foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta' });
clientePlanta_1.default.hasOne(Oportunidad, { foreignKey: 'clientePlanta_idclientePlanta', as: 'oportunidad' });
exports.default = Oportunidad;
