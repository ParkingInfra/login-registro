import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {
  const navigate = useNavigate();

  // --- ESTADOS PARA CATÁLOGOS DINÁMICOS ---
  const [facultades, setFacultades] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // --- CARGA DE DATOS DESDE ORACLE (EFECTO F5) ---
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resFacultades = await fetch('http://localhost:3001/api/facultades');
        if (resFacultades.ok) {
          const data = await resFacultades.json();
          setFacultades(data);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const datosUsuario = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3001/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu perfil ha sido creado. Ya puedes iniciar sesión con tu carné.',
          icon: 'success',
          confirmButtonText: 'Ir al Login',
          confirmButtonColor: 'var(--azul-universitario)',
          background: 'var(--fondo-blanco)',
          color: 'var(--azul-oscuro)'
        }).then((result) => {
          if (result.isConfirmed) navigate('/login');
        });
      } else {
        Swal.fire({
          title: 'Error de Validación',
          text: data.error || 'Verifica que el carné o correo no estén duplicados.',
          icon: 'error',
          confirmButtonColor: 'var(--rojo-institucional)'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error de Conexión',
        text: 'El servidor de base de datos no responde.',
        icon: 'error',
        confirmButtonColor: 'var(--rojo-institucional)'
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--fondo-general)', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={9}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px' }}>
              {/* Acento visual según Guía de Diseño */}
              <div style={{ height: '5px', backgroundColor: 'var(--azul-celeste-v2)' }} />
              
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold" style={{ color: 'var(--azul-universitario)', fontStyle: 'italic', fontFamily: 'var(--fuente-titulos)' }}>
                    Registro de Parqueo UMG
                  </h2>
                  <p className="text-muted" style={{ fontFamily: 'var(--fuente-principal)' }}>
                    Ingresa tus datos para la asignación de marbete y acceso vehicular
                  </p>
                </div>

                <Form onSubmit={handleSubmit} style={{ fontFamily: 'var(--fuente-principal)' }}>
                  {/* Rol oculto: 1 = Estudiante */}
                  <input type="hidden" name="id_rol" value="1" />

                  {/* --- SECCIÓN 1: IDENTIDAD --- */}
                  <h5 className="mb-3 fw-bold border-bottom pb-2" style={{ color: 'var(--azul-universitario)', fontStyle: 'italic', fontFamily: 'var(--fuente-titulos)' }}>
                    1. Información Personal
                  </h5>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nombres</Form.Label>
                        <Form.Control name="nombres" type="text" required placeholder="Nombres completos" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Apellidos</Form.Label>
                        <Form.Control name="apellidos" type="text" required placeholder="Apellidos completos" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Número de Carné</Form.Label>
                        <Form.Control name="carne" type="text" required placeholder="XXXX-XX-XXXXX" pattern="[0-9]{4}-[0-9]{2}-[0-9]{1,6}" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Correo Institucional</Form.Label>
                        <Form.Control name="correo_electronico" type="email" required placeholder="usuario@miumg.edu.gt" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Teléfono</Form.Label>
                        <Form.Control name="telefonos" type="tel" required placeholder="8 dígitos" pattern="[0-9]{8}" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Contraseña de Acceso</Form.Label>
                        <Form.Control name="password" type="password" required placeholder="Mínimo 8 caracteres" />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCIÓN 2: UBICACIÓN --- */}
                  <h5 className="mb-3 fw-bold border-bottom pb-2" style={{ color: 'var(--azul-universitario)', fontStyle: 'italic', fontFamily: 'var(--fuente-titulos)' }}>
                    2. Dirección de Residencia
                  </h5>
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Municipio</Form.Label>
                        <Form.Select name="id_municipio" required>
                          <option value="">Selecciona...</option>
                          <option value="1">Guatemala (Ciudad)</option>
                          <option value="2">Villa Nueva</option>
                          <option value="3">San Miguel Petapa</option>
                          <option value="4">Mixco</option>
                          <option value="5">Antigua Guatemala</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Zona</Form.Label>
                        <Form.Select name="zona">
                          <option value="">N/A</option>
                          {[...Array(25)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">(Casa/Apto/Calle)</Form.Label>
                        <Form.Control name="nomenclatura" type="text" required placeholder="Ej: Villas de Guillen Casa H9" />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCIÓN 3: ACADÉMICO --- */}
                  <h5 className="mb-3 fw-bold border-bottom pb-2" style={{ color: 'var(--azul-universitario)', fontStyle: 'italic', fontFamily: 'var(--fuente-titulos)' }}>
                    3. Datos Académicos
                  </h5>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Facultad</Form.Label>
                        {/* 1. Usamos la variable 'cargando' para bloquear la caja mientras Oracle responde */}
                        <Form.Select name="id_facultad" required disabled={cargando}>
                          
                          {/* 2. Dejamos el texto normal, limpio y elegante */}
                          {/* El truco ninja: disabled y hidden hacen que sea solo un texto fantasma */}
                          <option value="" disabled hidden>Selecciona tu facultad...</option>
                          
                          {/* 3. React inyectará los datos aquí en silencio cuando lleguen */}
                          {facultades.map((f) => (
                            <option key={f.ID_FACULTAD} value={f.ID_FACULTAD}>
                              {f.NOMBRE_FACULTAD}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Ciclo</Form.Label>
                        <Form.Select name="id_ciclo" required>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Ciclo {i + 1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Sección Base</Form.Label>
                        <Form.Select name="id_seccion" required>
                          <option value="1">A</option>
                          <option value="2">B</option>
                          <option value="3">C</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 mt-5">
                    <Button type="submit" size="lg" style={{ 
                      backgroundColor: 'var(--azul-universitario)', 
                      border: 'none',
                      fontFamily: 'var(--fuente-titulos)',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      padding: '12px'
                    }}>
                      Finalizar Registro de Estudiante
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <Link to="/login" className="text-decoration-none fw-bold" style={{ color: 'var(--azul-celeste-v1)' }}>
                      ¿Ya tienes cuenta? Inicia Sesión aquí
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registro;