"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const prealtaAlta = connection_1.default.define('prealtaAlta', {
    idprealtaAlta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprealtaAlta'
    },
    alta_idalta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    prealta_idprealta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'prealtaAlta',
});
exports.default = prealtaAlta;
