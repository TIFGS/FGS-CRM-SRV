"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const oportunidad_1 = __importDefault(require("./oportunidad"));
const oportunidadActividad = connection_1.default.define('actividadesOportunidades', {
    idactividadesOportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesOportunidades'
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
    oportunidades_idoportunidades: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    createdAt: false,
    updatedAt: false,
    //tableName:'actividadesOportunidades',
});
oportunidadActividad.belongsTo(oportunidad_1.default, { foreignKey: 'oportunidades_idoportunidades', as: 'oportunidades' });
oportunidad_1.default.hasMany(oportunidadActividad, { foreignKey: 'oportunidades_idoportunidades', as: 'actividadesOportunidades' });
exports.default = oportunidadActividad;
