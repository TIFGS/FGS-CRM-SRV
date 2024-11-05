import db from '../db/connection';
import { DataTypes } from 'sequelize';
import cotizacion from './cotizacion';

const cotizacionActividad = db.define('actividadesCotizaciones', {
    idactividadesCotizaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesCotizaciones'
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
    cotizaciones_idcotizaciones:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'actividadesCotizaciones',
});

cotizacionActividad.belongsTo(cotizacion, {foreignKey:'cotizaciones_idcotizaciones',as: 'cotizacion'});
cotizacion.hasMany(cotizacionActividad, {foreignKey:'cotizaciones_idcotizaciones', as: 'actividadesCotizaciones'});

export default cotizacionActividad;