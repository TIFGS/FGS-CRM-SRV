"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const marca_1 = __importDefault(require("./marca"));
const planta = connection_1.default.define('planta', {
    idplanta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idplanta'
    },
    nombrepl: {
        type: sequelize_1.DataTypes.STRING,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    cp: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
    },
    marca_idmarca: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'planta',
});
planta.belongsTo(marca_1.default, { foreignKey: 'marca_idmarca' });
marca_1.default.hasMany(planta, { foreignKey: 'marca_idmarca' });
exports.default = planta;
