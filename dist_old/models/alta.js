"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const clientePlanta_1 = __importDefault(require("./clientePlanta"));
const Alta = connection_1.default.define('alta', {
    idalta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idalta'
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechaActualizacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    estilo: {
        type: sequelize_1.DataTypes.STRING,
    },
    entrada: {
        type: sequelize_1.DataTypes.STRING,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipoAlta: {
        type: sequelize_1.DataTypes.STRING,
    },
    numeroAlta: {
        type: sequelize_1.DataTypes.STRING,
    },
    numeroPreAlta: {
        type: sequelize_1.DataTypes.STRING,
    },
    liberacionProduccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    productOrder: {
        type: sequelize_1.DataTypes.STRING,
    },
    materialEmpaque: {
        type: sequelize_1.DataTypes.STRING,
    },
    conceptoDigital: {
        type: sequelize_1.DataTypes.DATE,
    },
    prototipo: {
        type: sequelize_1.DataTypes.DATE,
    },
    entregaProduccion: {
        type: sequelize_1.DataTypes.DATE,
    },
    dibujos: {
        type: sequelize_1.DataTypes.STRING,
    },
    modalidadDibujo: {
        type: sequelize_1.DataTypes.STRING,
    },
    numeroParte: {
        type: sequelize_1.DataTypes.STRING,
    },
    entregable: {
        type: sequelize_1.DataTypes.STRING,
    },
    Notas: {
        type: sequelize_1.DataTypes.STRING,
    },
    operacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    comision: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ganancia: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    clientePlanta_idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'alta',
});
Alta.belongsTo(clientePlanta_1.default, { foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta' });
clientePlanta_1.default.hasOne(Alta, { foreignKey: 'clientePlanta_idclientePlanta', as: 'alta' });
exports.default = Alta;
