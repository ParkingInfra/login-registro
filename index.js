require('dotenv').config();
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs'); // Libreria para encriptar contrasenas

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

// Ruta de prueba (La que ya viste funcionando)
app.get('/', async (req, res) => {
  res.json({ mensaje: "Conexion exitosa a Oracle 21c (Usuario: parqueo_umg)" });
});

// --- RUTA PRINCIPAL: Recibir datos de React y guardar en Oracle
app.post('/api/auth/registro', async (req, res) => {
  let connection;
  try {
    const datos = req.body;
    console.log("[INFO] Datos recibidos desde React:", datos);

    // 1. Encriptar la contrasena (Regla de negocio)
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(datos.password, salt);

    // 2. Conectar a Oracle
    connection = await oracledb.getConnection(dbConfig);

    // 3. Preparar el INSERT para la tabla USUARIOS normalizada
    const sqlUsuario = `
      INSERT INTO USUARIOS (
        carne, nombres, apellidos, correo_institucional, contrasena,
        telefono, id_municipio, zona, nomenclatura, id_categoria, 
        id_sede, id_facultad, id_ciclo, id_seccion, id_jornada, id_rol
      ) VALUES (
        :carne, :nombres, :apellidos, :correo, :contrasena,
        :telefono, :id_municipio, :zona, :nomenclatura, :id_categoria, 
        :id_sede, :id_facultad, :id_ciclo, :id_seccion, :id_jornada, :id_rol
      )
    `;

    const bindsUsuario = {
      carne: datos.carne,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      correo: datos.correo_electronico,
      contrasena: contrasenaEncriptada,
      telefono: datos.telefonos,
      // Aqui mapeamos los 3 nuevos campos de la direccion
      id_municipio: parseInt(datos.id_municipio),
      zona: datos.zona ? parseInt(datos.zona) : null,
      nomenclatura: datos.nomenclatura,
      
      id_categoria: parseInt(datos.id_rol), 
      id_sede: parseInt(datos.id_sede),
      id_facultad: parseInt(datos.id_facultad),
      id_ciclo: parseInt(datos.id_ciclo),
      id_seccion: parseInt(datos.id_seccion),
      id_jornada: parseInt(datos.id_jornada),
      id_rol: 3 
    };

    // Ejecutamos el insert del usuario
    await connection.execute(sqlUsuario, bindsUsuario);

    // 4. Preparar el INSERT para la tabla DATOS_EMERGENCIA
    const sqlEmergencia = `
      INSERT INTO DATOS_EMERGENCIA (carne_usuario, nombre_contacto, telefono_emergencia)
      VALUES (:carne, :nombre, :telefono)
    `;
    
    const bindsEmergencia = {
      carne: datos.carne,
      nombre: datos.emergencia_nombre,
      telefono: datos.emergencia_telefono
    };

    await connection.execute(sqlEmergencia, bindsEmergencia);

    // 5. Confirmar transaccion (El famoso COMMIT)
    await connection.commit();

    console.log("[OK] Usuario registrado exitosamente en BD.");
    res.status(200).json({ mensaje: "Tu registro se completó con éxito. Ya puedes iniciar sesión." });

  } catch (err) {
    console.error("[ERROR] Error al guardar en Oracle:", err);
    
    // Si algo sale mal, hacemos ROLLBACK para no dejar datos a medias
    if (connection) {
      await connection.rollback();
    }
    
    // Si el error es ORA-00001 (Unique constraint violated)
    if (err.errorNum === 1) {
       return res.status(400).json({ error: "El carné o correo ingresado ya se encuentra registrado en el sistema." });
    }
    
    res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
  } finally {
    // 6. Cerrar conexion
    if (connection) {
      try { await connection.close(); } catch (e) { console.error(e); }
    }
  }
});

// --- RUTA DE LOGIN: Validar credenciales
app.post('/api/auth/login', async (req, res) => {
  let connection;
  try {
    const { carne, password } = req.body;
    console.log(`[INFO] Intento de login para carne: ${carne}`);

    connection = await oracledb.getConnection(dbConfig);

    // 1. Buscamos al usuario en Oracle (Pedimos que el resultado sea un Objeto JSON)
    const result = await connection.execute(
      `SELECT carne, nombres, apellidos, contrasena, id_rol 
       FROM USUARIOS 
       WHERE carne = :carne AND activo = 1`,
      [carne],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // 2. Si no devuelve filas, el carne no existe
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Carné o contraseña incorrectos." });
    }

    const usuario = result.rows[0];

    // 3. Comparamos la contrasena de React con la encriptada en Oracle
    const contrasenaValida = await bcrypt.compare(password, usuario.CONTRASENA);

    if (!contrasenaValida) {
      return res.status(401).json({ error: "Carné o contraseña incorrectos." });
    }

    // 4. Login exitoso. Devolvemos los datos (sin la contrasena) para el Dashboard
    console.log(`[OK] Acceso concedido a: ${usuario.NOMBRES}`);
    res.status(200).json({
      mensaje: "Login exitoso",
      usuario: {
        carne: usuario.CARNE,
        nombres: usuario.NOMBRES,
        apellidos: usuario.APELLIDOS,
        rol: usuario.ID_ROL
      }
    });

  } catch (err) {
    console.error("[ERROR] Error en el Login:", err);
    res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) { console.error(e); }
    }
  }
});

app.listen(port, () => {
  console.log(`[SERVER] Servidor de Parqueo corriendo en http://localhost:${port}`);
});