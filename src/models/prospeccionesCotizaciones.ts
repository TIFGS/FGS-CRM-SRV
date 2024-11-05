import db from '../db/connection';
import { DataTypes } from 'sequelize';

const prospeccionesCotizaciones = db.define('prospeccionesCotizaciones', {
    idprospeccionesCotizaciones:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprospeccionesCotizaciones'
    },
    cotizaciones_idcotizaciones:{
        type: DataTypes.INTEGER,
    },
    prospecciones_idprospecciones:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'prospeccionesCotizaciones',
    
});

export default prospeccionesCotizaciones;