"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const prospeccion_1 = __importDefault(require("./prospeccion"));
const prospeccionActividad = connection_1.default.define('actividadesProspecciones', {
    idactividadesProspecciones: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesProspecciones'
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
    prospecciones_idprospecciones: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'actividadesProspecciones',
});
prospeccionActividad.belongsTo(prospeccion_1.default, { foreignKey: 'prospecciones_idprospecciones', as: 'prospeccion' });
prospeccion_1.default.hasMany(prospeccionActividad, { foreignKey: 'prospecciones_idprospecciones', as: 'actividadesProspecciones' });
exports.default = prospeccionActividad;
