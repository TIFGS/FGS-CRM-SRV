"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const partes_1 = __importDefault(require("./partes"));
const alta_1 = __importDefault(require("./alta"));
const altaHistoricos = connection_1.default.define('historicosAlta', {
    idhistoricosAlta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosAlta'
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
    alta_idAlta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosAlta',
});
altaHistoricos.belongsTo(alta_1.default, { foreignKey: 'alta_idAlta', as: 'alta' });
alta_1.default.hasMany(altaHistoricos, { foreignKey: 'alta_idAlta', as: 'historicosAlta' });
altaHistoricos.belongsTo(partes_1.default, { foreignKey: 'partes_idpartes', as: 'parte' });
partes_1.default.hasOne(altaHistoricos, { foreignKey: 'partes_idpartes', as: 'historicosAlta' });
exports.default = altaHistoricos;
