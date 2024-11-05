"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const alta_1 = __importDefault(require("./alta"));
const altaActividad = connection_1.default.define('actividadesAlta', {
    idactividadesAlta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesAlta'
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
    alta_idalta: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'actividadesAlta',
});
altaActividad.belongsTo(alta_1.default, { foreignKey: 'alta_idalta', as: 'alta' });
alta_1.default.hasMany(altaActividad, { foreignKey: 'alta_idalta', as: 'actividadesAlta' });
exports.default = altaActividad;
