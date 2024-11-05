import {Request,Response} from 'express';
import Usuario from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CookieSerializeOptions, serialize } from 'cookie';



export const getAllUser = async (req:Request, res:Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const listAlumnos = await Usuario.findAll();
  res.json(listAlumnos); 
}

export const getUser = async (req:Request, res:Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const {id} = req.params;
  const alumno = await Usuario.findByPk(id);
  res.json(alumno); 
}

export const postUser = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  // Verificar si el usuario ya está registrado
  const existingUser = await Usuario.findOne({ where: { username: req.body.username } });
  if (existingUser) 
    return console.log('El usuario ya está registrado' );
  // Generar el hash de la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = { username:req.body.username, password:hashedPassword };
  // Crear el nuevo usuario en la base de datos
    await Usuario.create(newUser);
    res.json({
        msg: 'El usuario se agrego con exito!'
    })
  console.log( 'Usuario registrado correctamente');
};

export const login = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const { username } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { username: username } });
    if (usuario) {
      // Comprobar si la contraseña coincide
      const passwordMatch = await bcrypt.compare(req.body.password, usuario.dataValues['password']);
      if (passwordMatch) {
        const cookieOptions: CookieSerializeOptions = {
          httpOnly: true,
          maxAge: 10, // Tiempo en segundos para que la cookie expire (1 hora en este ejemplo)
          sameSite: 'strict',
        };
        const token = jwt.sign({ userId: usuario.dataValues['id'], username: usuario.dataValues['username'] }, 'secreto', { expiresIn: '1h' });
        res.cookie('fgs0102', token, cookieOptions).json({ token });
      } else {
        res.json(1); //'Usuario y/o contraseña incorrecta'
      }
    } else {
      res.json(1);   // 'No se encontró el usuario'
    }
  } catch (error) {
    res.json(2);//'Error al buscar el usuario' 
  }
};
    

export const deleteUser = async (req:Request,res:Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const { id } = req.params;
  const alumno = await Usuario.findByPk(id);
  if(!alumno){
      res.status(404).json({
          msg:`No se encontro ningun usuario con id ${id}`
      })
  }else{
      await alumno.destroy();
      res.json({
          msg:`El usuario fue eliminado con exito!`
      })
  }
}



export const updateUser = async (req:Request,res:Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  const { body } = req;
  const {id} = req.params;
  const usuario = await Usuario.findByPk(id);
  if(usuario){
    const existingUser = await Usuario.findOne({ where: { username: req.body.username } });
    if (!existingUser || req.body.username == usuario.dataValues.username){ 
      if(req.body.password != ''){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const UpUser = { username:req.body.username, password:hashedPassword };
        await usuario.update(UpUser);

      }else
        await usuario.update({username:req.body.username});
        res.json(1);//'El usuario se actualizo con exito!'
      
    }else{
      res.json(2); //'El nombre de usuario que ingreso ya esta registrado'
      
    }
  }else{
      res.json(3)  //`No se encontro ningun usuario con id ${id}`
    
  }
}

// POST /logout
export const logout = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  try {
    // Eliminar token de autenticación de la sesión actual
    res.clearCookie('fgs0102');
    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cerrar sesión');
  }
};

  // Middleware de autenticación
export const authToken = (req: Request, res: Response, next: any) => {
  //const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado de autorización
  //console.log(res.json().getHeader('Set-cookie'));
  /*if (!token) {
    return console.log('Token no proporcionado');
  }

  try {
    const decoded = jwt.verify(token, 'secreto') as JwtPayload; // Decodificar el token
    const userId = decoded.userId; // Obtener el userId del objeto decodificado

    req.body.userId = userId; // Asignar el userId al cuerpo de la solicitud
    next();
  } catch (error) {
  */}



