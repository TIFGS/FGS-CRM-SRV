import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config(); 

//const sequelize = new Sequelize('forzaglo_crm', 'forzaglo_crm', 'M#1j58bg9', {
//const sequelize = new Sequelize('forzaglo_crm_rls', 'forzaglo_Release', '47y*7lVr5', {
const sequelize = new Sequelize(process.env.DATABASE! as string, process.env.USERDB! as string, process.env.PASSDB!, {
    host: 'forzaglobal.com',
    port: 3306,
    dialect: 'mysql',
    logging: false, // Puedes habilitar los logs si lo deseas
});  

export default sequelize; 