import Server from "./models/server";
import dotenv from 'dotenv';

//Se configuran variables de ambiente
dotenv.config();
const server = new Server();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



/*const fs = require('fs');
fs.readFile('/var/www/vhosts/forzaglobal.com/httpdocs/dev.forzaglobal.com/crm/ServerFG/Old_old/node_modules/.package-lock.json', 'utf8', (err:any, data:any) => {
    if (err) throw err;
    console.log(data);
});*/