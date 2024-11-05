"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const planta_1 = __importDefault(require("./planta"));
const cliente_1 = __importDefault(require("./cliente"));
const vendedor_1 = __importDefault(require("./vendedor"));
const clientePlanta = connection_1.default.define('clientePlanta', {
    idclientePlanta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idclientePlanta'
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    porcentajeRef: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    planta_idplanta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cliente_idcliente: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    vendedor_idvendedor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    vendedor_idvendedorRef: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'clientePlanta',
});
clientePlanta.belongsTo(planta_1.default, { foreignKey: 'planta_idplanta', as: 'planta' });
clientePlanta.belongsTo(cliente_1.default, { foreignKey: 'cliente_idcliente', as: 'cliente' });
clientePlanta.belongsTo(vendedor_1.default, { foreignKey: 'vendedor_idvendedor', as: 'vendedor' });
clientePlanta.belongsTo(vendedor_1.default, { foreignKey: 'vendedor_idvendedorRef', as: 'vendedorRef' });
planta_1.default.hasMany(clientePlanta, { foreignKey: 'planta_idplanta', as: 'clientePlanta' });
cliente_1.default.hasMany(clientePlanta, { foreignKey: 'cliente_idcliente', as: 'clientePlanta' });
vendedor_1.default.hasMany(clientePlanta, { foreignKey: 'vendedor_idvendedor', as: 'clientePlanta' });
vendedor_1.default.hasMany(clientePlanta, { foreignKey: 'vendedor_idvendedorRef', as: 'clientePlantaRef' });
exports.default = clientePlanta;
