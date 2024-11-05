import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Alta from './alta';

const altaActividad = db.define('actividadesAlta', {
    idactividadesAlta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesAlta'
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
    alta_idalta:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'actividadesAlta',
});

altaActividad.belongsTo(Alta, {foreignKey:'alta_idalta',as: 'alta'});
Alta.hasMany(altaActividad, {foreignKey:'alta_idalta',as: 'actividadesAlta'});

export default altaActividad;