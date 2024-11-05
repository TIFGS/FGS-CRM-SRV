import db from '../db/connection';
import { DataTypes } from 'sequelize';

const prospeccionesCotizaciones = db.define('prospeccionesCotizaciones', {
    idoportunidadesProspecciones:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idoportunidadesProspecciones'
    },
    prospecciones_idprospecciones:{
        type: DataTypes.INTEGER,
    },
    oportunidades_idoportunidades:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'prospeccionesCotizaciones',
    
});

export default prospeccionesCotizaciones;