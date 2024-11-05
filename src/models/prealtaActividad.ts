import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Prealta from './prealta';


const PrealtaActividad = db.define('actividadesPrealta', {
    idactividadesPrealta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesPrealta'
    },
    titulo:{
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    fechacrea:{
        type: DataTypes.DATE,
    },
    fecharecord:{
        type: DataTypes.DATE,
    },
    prealta_idprealta:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'actividadesPrealta',
});

PrealtaActividad.belongsTo(Prealta, {foreignKey:'prealta_idprealta',as:'prealta'});
Prealta.hasMany(PrealtaActividad, {foreignKey:'prealta_idprealta',as:'actividadesPrealta'});

export default PrealtaActividad;