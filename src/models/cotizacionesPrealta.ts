import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Prealta from './prealta';
import Cotizacion from './cotizacion';

const cotizacionesPrealta = db.define('cotizacionesPrealta', {
    idcotizacionesPrealta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizacionesPrealta'
    },
    prealta_idPreAlta:{
        type: DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'cotizacionesPrealta',
    
});

/*cotizacionesPrealta.belongsTo(Prealta,{foreignKey:'prealta_idPreAlta'});
cotizacionesPrealta.belongsTo(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});
Prealta.hasOne(Prealta,{foreignKey:'prealta_idPreAlta'});
Cotizacion.hasOne(Cotizacion,{foreignKey:'cotizaciones_idcotizaciones'});*/

export default cotizacionesPrealta;