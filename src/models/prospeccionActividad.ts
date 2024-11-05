import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Prospeccion from './prospeccion';


const prospeccionActividad = db.define('actividadesProspecciones', {
    idactividadesProspecciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesProspecciones'
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
    prospecciones_idprospecciones:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'actividadesProspecciones',
});

prospeccionActividad.belongsTo(Prospeccion, {foreignKey:'prospecciones_idprospecciones',as:'prospeccion'});
Prospeccion.hasMany(prospeccionActividad, {foreignKey:'prospecciones_idprospecciones',as:'actividadesProspecciones'});

export default prospeccionActividad;