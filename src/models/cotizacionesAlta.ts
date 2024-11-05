import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Alta from './alta';
import Cotizacion from './cotizacion';

const cotizacionesAlta = db.define('cotizacionesAlta', {
    idcotizacionesAlta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizacionesAlta'
    },
    alta_idalta:{
        type: DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'cotizacionesAlta',
    
});

/*cotizacionesAlta.belongsTo(Alta,{foreignKey:'Altas_idAltas'});
Alta.hasOne(Alta,{foreignKey:'Altas_idAltas'});
cotizacionesAlta.belongsTo(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});
Cotizacion.hasOne(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});*/

export default cotizacionesAlta;