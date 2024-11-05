"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const clientePlanta_1 = __importDefault(require("./clientePlanta"));
const Prospeccion = connection_1.default.define('prospeccion', {
    idprospecciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprospecciones'
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
    probabilidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    clientePlanta_idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'prospecciones',
});
Prospeccion.belongsTo(clientePlanta_1.default, { foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta' });
clientePlanta_1.default.hasOne(Prospeccion, { foreignKey: 'clientePlanta_idclientePlanta', as: 'prospeccion' });
exports.default = Prospeccion;
