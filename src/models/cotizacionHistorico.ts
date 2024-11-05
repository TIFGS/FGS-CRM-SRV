import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Cotizacion from './cotizacion';
import partes from './partes';

const cotizacionHistorico = db.define('historicosCotizaciones', {
    idhistoricosCotizaciones:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosCotizaciones'
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    cantidad:{
        type: DataTypes.DECIMAL,
    },
    precioUni:{
        type: DataTypes.DECIMAL,
    },
    UMedida:{
        type:DataTypes.STRING,
    },
    Tooling:{
        type:DataTypes.DECIMAL,
    },
    Replica:{
        type:DataTypes.DECIMAL,
    },
    Prototipo:{
        type:DataTypes.DECIMAL,
    },
    Flete:{
        type:DataTypes.DECIMAL,
    },
    Dibujo:{
        type:DataTypes.DECIMAL,
    },
    Desarrollo:{
        type:DataTypes.DECIMAL,
    },
    ReplicaMateriales:{
        type:DataTypes.DECIMAL,
    },
    ReplicaObra:{
        type:DataTypes.DECIMAL,
    },
    Empaque:{
        type:DataTypes.DECIMAL,
    },
    Validacion:{
        type:DataTypes.DECIMAL,
    },
    precioTotal:{
        type: DataTypes.DECIMAL,
    },
    version:{
        type: DataTypes.DECIMAL,
    },
    partes_idpartes:{
        type: DataTypes.INTEGER,
    },
    cotizaciones_idcotizaciones:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'historicosCotizaciones',
});

cotizacionHistorico.belongsTo(Cotizacion, { foreignKey: 'cotizaciones_idcotizaciones',as:'cotizacion'});
Cotizacion.hasMany(cotizacionHistorico, { foreignKey: 'cotizaciones_idcotizaciones',as:'historicosCotizaciones'});
cotizacionHistorico.belongsTo(partes, { foreignKey: 'partes_idpartes',as:'parte'});
partes.hasMany(cotizacionHistorico, { foreignKey: 'partes_idpartes',as:'historicosCotizaciones'});


export default cotizacionHistorico;