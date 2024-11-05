"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const prealta_1 = __importDefault(require("./prealta"));
const PrealtaActividad = connection_1.default.define('actividadesPrealta', {
    idactividadesPrealta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesPrealta'
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
    prealta_idprealta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'actividadesPrealta',
});
PrealtaActividad.belongsTo(prealta_1.default, { foreignKey: 'prealta_idprealta', as: 'prealta' });
prealta_1.default.hasMany(PrealtaActividad, { foreignKey: 'prealta_idprealta', as: 'actividadesPrealta' });
exports.default = PrealtaActividad;
