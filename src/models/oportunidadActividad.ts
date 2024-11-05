import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Oportunidad from './oportunidad';


const oportunidadActividad = db.define('actividadesOportunidades', {
    idactividadesOportunidades: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesOportunidades'
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
    oportunidades_idoportunidades:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    //tableName:'actividadesOportunidades',
});

oportunidadActividad.belongsTo(Oportunidad, {foreignKey:'oportunidades_idoportunidades',as:'oportunidades'});
Oportunidad.hasMany(oportunidadActividad, {foreignKey:'oportunidades_idoportunidades',as:'actividadesOportunidades'});

export default oportunidadActividad;