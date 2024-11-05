import { DateTime } from 'luxon';
import express,{ Application, Request, Response } from 'express';
import routeUser from '../routes/user';
import routePermiso  from '../routes/permiso';
import routePermuser  from '../routes/permusuario';
import routeCotizacion from '../routes/cotizacion';
import routeCliente from '../routes/cliente';
import routeFactura from '../routes/factura';
import routePrealta from '../routes/prealta';
import routeAltas from '../routes/alta';
import routeProspeccion from '../routes/prospeccion';
import routeOportunidad from '../routes/oportunidad';
import routeOportunidadHistorico from '../routes/oportunidadHistorico';
import routeProspeccionHistorico from '../routes/prospeccionHistorico';
import routeCotizacionHistorico from '../routes/cotizacionHistorico';
import routePrealtaHistorico from '../routes/prealtaHistorico';
import routeAltaHistorico from '../routes/altaHistorico';
import routeFacturaHistorico from '../routes/facturaHistorico';
import routeOportunidadActividad from '../routes/oportunidadActividad';
import routeProspeccionActividad from '../routes/prospeccionActividad';
import routeCotizacionActividad from '../routes/cotizacionActividad';
import routePrealtaActividad from '../routes/prealtaActividad';
import routeAltaActividad from '../routes/altaActividad';
import routeFacturaActividad from '../routes/facturaActividad';
import routePartes from '../routes/partes';
import routeClientePlanta from '../routes/clientePlanta';
import routePlanta from '../routes/planta';
import routeVendedor from '../routes/vendedor';
import routeoportunidadesProspecciones from '../routes/oportunidadesProspecciones';
import routeprospeccionesCotizaciones from '../routes/prospeccionesCotizaciones';
import routecotizacionesPrealta from '../routes/cotizacionesPrealta';
import routecotizacionesAlta from '../routes/cotizacionesAlta';
import routeprealtaAlta from '../routes/prealtaAlta';
import routealtaFactura from '../routes/altaFactura';
import routeMarca from '../routes/marca';
import routeArea from '../routes/area';
import tableroResultados from '../routes/tableroResultados';
import resultadosDocumentos from '../routes/resultadosDocumentos';

import db from '../db/connection';
//import cors from 'cors';
const dotenv = require('dotenv').config();
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//const dirname = "https://dev.forzaglobal.com/crm/devKEY.pem";
import * as path from 'path';
import cookieParser from 'cookie-parser';

class Server{
    //private app: express.Application;
    private app = express();
    private port: string;
    private options: any;
    private server: any;

    constructor(){
        //dotenv.config();
        //this.app = express();
        
        console.log("Inicio Servidor",this.obtenerFechaActualMX());
        
        this.port = process.env.PORT! || '3002';  
        //this.port = process.env.PORT!||'3001';
        let direccion =process.cwd();
        
        this.options = {
            cert: fs.readFileSync(path.join(direccion, './CRT.pem'), {
                encoding: 'utf-8',
              }),
            key: fs.readFileSync(path.join(direccion, './KEY.pem'), {
                encoding: 'utf-8',
              }),
        };
        this.app.use(new cors({
            //origin: 'https://crm.forzaglobal.com',
            //origin: 'https://dev.forzaglobal.com',
            origin: process.env.CORS_ORIGIN!,
            credentials: true
        }));
        
        //console.log("Cors",process.env.CORS_ORIGIN!,)
        
        this.server = https.createServer(this.options, this.app);
        this.server.listen(this.port, () => {
            try{
                this.midlewares();
                this.routes();
                this.dbConnect();
            }catch(error){
                console.error("Error en el listen",this.obtenerFechaActualMX());
                console.error(error);
            }
        });
        //this.listen();
        /*this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();*/
    }

    ngOnInit() {
        this.app.use(cookieParser());
    }

    obtenerFechaActualMX(){
        const mexicoCity = DateTime.now().setZone('America/Mexico_City');
        return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        })
    }

    routes(){
        this.app.get('/', (req: Request, res:Response) => {
            res.json({
                msg: 'API WORKING',
                //dotenv: dotenv,
                //procesenv: process.env,
            })
        });
        
        this.app.post('/sendMail', async (req:Request,res:Response) => {
            const storage = multer.memoryStorage();
            const upload = multer({ storage: storage });
            try {
                const templatePath = './mailTest.html';
                //console.log("PATH",__dirname);
                
                const templateContent = fs.readFileSync(path.join(__dirname, './template/mailTest.html'),'utf-8');
                const { from, name, sendername, subject, email, message, to, cc, bcc, header, comentarios } = req.body;
        
                // extra backend validation
                if (!from || !name || !sendername || !subject || !email || !message || !to || !cc || !bcc) {
                    return res.status(400).json({ error: 'Missing required fields',fields: req.body });
                }
        
                // store attachment if provided
                
        
                // create nodemailer transport
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: true,
                    auth: {
                        user: process.env.MAILTRAP_USER,
                        pass: process.env.MAILTRAP_PASS
                    }
                });
        
                // replace placeholders in the email template with received data
                const emailHtml = this.replacePlaceholders(templateContent, { email, to, name, sendername, subject, message, header,comentarios});
        
                // define the options of your email like to/from-headers, subject line, body text, html and attachment
                const mailOptions = {
                    from:from,
                    to:to,
                    cc:cc,
                    bcc:bcc,
                    subject:subject,
                    text: "",
                    html: emailHtml,
                };
        
                // store send mail response
                const info = await transporter.sendMail(mailOptions);
        
                // provide console feedback and return a positive response to the client
                console.log('Email sent:', info.response);
                res.status(200).json({ msg: 'Email sent successfully' });
            } catch (error) {
                // provide error information in case there is any and send corresponding response
                console.error('Error sending email:',this.obtenerFechaActualMX());
                console.error(error);
                res.status(500).json({ msg: 'Error sending email' });
            }
        });

        this.app.use('/api/user/', routeUser);
        this.app.use('/api/permiso/', routePermiso);
        this.app.use('/api/permusuario/', routePermuser);
        this.app.use('/api/alta/',routeAltas);
        this.app.use('/api/cotizacion/',routeCotizacion);
        this.app.use('/api/cliente/',routeCliente);
        this.app.use('/api/factura/',routeFactura);
        this.app.use('/api/oportunidad/',routeOportunidad);
        this.app.use('/api/prealta/',routePrealta);
        this.app.use('/api/prospeccion/',routeProspeccion);
        this.app.use('/api/oportunidadHistorico/',routeOportunidadHistorico);
        this.app.use('/api/prospeccionHistorico/',routeProspeccionHistorico);
        this.app.use('/api/cotizacionHistorico/',routeCotizacionHistorico);
        this.app.use('/api/prealtaHistorico/',routePrealtaHistorico);
        this.app.use('/api/altaHistorico/',routeAltaHistorico);
        this.app.use('/api/facturaHistorico/',routeFacturaHistorico);
        this.app.use('/api/oportunidadActividad/',routeOportunidadActividad);
        this.app.use('/api/prospeccionActividad/',routeProspeccionActividad);
        this.app.use('/api/cotizacionActividad/',routeCotizacionActividad);
        this.app.use('/api/prealtaActividad/',routePrealtaActividad);
        this.app.use('/api/altaActividad/',routeAltaActividad);
        this.app.use('/api/facturaActividad/',routeFacturaActividad);
        this.app.use('/api/partes/',routePartes);
        this.app.use('/api/clientePlanta/',routeClientePlanta);
        this.app.use('/api/planta/',routePlanta);
        this.app.use('/api/vendedor/',routeVendedor);
        this.app.use('/api/oportunidadesProspecciones/',routeoportunidadesProspecciones);
        this.app.use('/api/prospeccionesCotizaciones/',routeprospeccionesCotizaciones);
        this.app.use('/api/cotizacionesPrealta/',routecotizacionesPrealta);
        this.app.use('/api/cotizacionesAlta/',routecotizacionesAlta);
        this.app.use('/api/prealtaAlta/',routeprealtaAlta);
        this.app.use('/api/altaFactura/',routealtaFactura);
        this.app.use('/api/marca/',routeMarca);
        this.app.use('/api/area/',routeArea);
        this.app.use('/api/tableroResultados/',tableroResultados);
        this.app.use('/api/resultadosDocumentos',resultadosDocumentos);
    }

    replacePlaceholders(html: string, data: { [x: string]: any; to?:any; name?: any; subject?: any; email?: any; message?: any;  hasOwnProperty?: any; }) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const placeholder = `{{${key}}}`;
                html = html.replace(new RegExp(placeholder, 'g'), data[key]);
            }
        }
        return html;
    }

    midlewares(){
        //Parsear el body
        this.app.use(express.json());
    }
    

    async dbConnect(){
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('Error al conectar la base de datos', error);
        }
        
    }
    
}

export default Server;