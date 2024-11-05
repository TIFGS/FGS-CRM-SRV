"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes_1 = __importDefault(require("./partes"));
const prealta_1 = __importDefault(require("./prealta"));
const prealtaHistorico = connection_1.default.define('historicosPrealta', {
    idhistoricosPrealta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosPrealta'
    },
    numItem: {
        type: sequelize_1.DataTypes.STRING,
    },
    cantidad: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    UMedida: {
        type: sequelize_1.DataTypes.STRING,
    },
    parteCliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    concepto: {
        type: sequelize_1.DataTypes.STRING,
    },
    material: {
        type: sequelize_1.DataTypes.STRING,
    },
    foam: {
        type: sequelize_1.DataTypes.STRING,
    },
    calibre: {
        type: sequelize_1.DataTypes.STRING,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING,
    },
    precioUni: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Tooling: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Replica: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Prototipo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Flete: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Dibujo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Desarrollo: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ReplicaMateriales: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ReplicaObra: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Empaque: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Validacion: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    precioTotal: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    version: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    partes_idpartes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    prealta_idprealta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosPrealta',
});
prealtaHistorico.belongsTo(prealta_1.default, { foreignKey: 'prealta_idprealta', as: 'prealta' });
prealta_1.default.hasMany(prealtaHistorico, { foreignKey: 'prealta_idprealta', as: 'historicosPrealta' });
prealtaHistorico.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasOne(prealtaHistorico, { foreignKey: 'partes_idpartes', as: 'historicosPrealta' });
exports.default = prealtaHistorico;
