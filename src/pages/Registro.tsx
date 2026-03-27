import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Capturamos todos los datos del formulario mágicamente
    const formData = new FormData(e.currentTarget);
    const datosUsuario = Object.fromEntries(formData.entries());

    try {
      // 2. Enviamos los datos a nuestro Node.js + Oracle
      const response = await fetch('http://localhost:3001/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Alerta Profesional de Éxito (SweetAlert2)
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu usuario ha sido creado en la base de datos oficial. Ya puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ir al Login',
          confirmButtonColor: '#003366',
          background: '#ffffff',
          color: '#001224'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login'); // Lo mandamos de regreso a que inicie sesión
          }
        });
      } else {
        // 4. Alerta de Error (Ej: Carné duplicado)
        Swal.fire({
          title: '¡Error en el Registro!',
          text: data.error || 'Hubo un problema al guardar tus datos.',
          icon: 'error',
          confirmButtonText: 'Revisar datos',
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        title: 'Error de Servidor',
        text: 'No se pudo conectar con el servidor de base de datos.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#001224', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: '#003366' }}>Registro de Parqueo UMG</h2>
                  <p className="text-muted">Completa tu ficha para obtener acceso a las instalaciones</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* Campo oculto para mandar la Categoría 1 (Estudiante) por defecto al backend */}
                  <input type="hidden" name="id_rol" value="1" />

                  {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
                  <h5 className="mb-3 fw-bold border-bottom pb-2" style={{ color: '#003366' }}>1. Datos Personales</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Nombres</Form.Label>
                        <Form.Control name="nombres" type="text" required placeholder="Ej: Juan Carlos" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Apellidos</Form.Label>
                        <Form.Control name="apellidos" type="text" required placeholder="Ej: Pérez Gómez" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Número de Carné</Form.Label>
                        <Form.Control name="carne" type="text" required placeholder="Ej: 5190-24-1234" pattern="[0-9]{4}-[0-9]{2}-[0-9]{1,6}" title="Formato válido: 0000-00-0000" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Teléfono Celular</Form.Label>
                        <Form.Control name="telefonos" type="tel" required placeholder="Ej: 55554444" pattern="[0-9]{8}" title="Debe contener exactamente 8 dígitos" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Correo Institucional</Form.Label>
                        <Form.Control name="correo_electronico" type="email" required placeholder="usuario@miumg.edu.gt" pattern=".+@miumg\.edu\.gt" title="Debe ser un correo válido de @miumg.edu.gt" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                        <Form.Control name="password" type="password" required placeholder="Mínimo 8 caracteres" minLength={8} />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCIÓN 2: DIRECCIÓN NORMALIZADA --- */}
                  <h5 className="mb-3 mt-4 fw-bold border-bottom pb-2" style={{ color: '#003366' }}>2. Ubicación Geográfica</h5>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Municipio de Residencia</Form.Label>
                        <Form.Select name="id_municipio" required className="bg-light">
                          <option value="">Selecciona municipio...</option>
                          <optgroup label="Depto. de Guatemala">
                            <option value="1">Guatemala (Ciudad)</option>
                            <option value="2">Villa Nueva</option>
                            <option value="3">San Miguel Petapa</option>
                            <option value="4">Amatitlán</option>
                            <option value="5">Mixco</option>
                          </optgroup>
                          <optgroup label="Depto. de Sacatepéquez">
                            <option value="6">Antigua Guatemala</option>
                          </optgroup>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Zona</Form.Label>
                        {/* Opción para los que no tienen zona, sin el required */}
                        <Form.Select name="zona" className="bg-light">
                          <option value="">No aplica / Sin zona</option>
                          {[...Array(25)].map((_, i) => (
                            <option key={i+1} value={i+1}>Zona {i+1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Nomenclatura (Casa/Residencial)</Form.Label>
                        <Form.Control name="nomenclatura" type="text" required placeholder="Ej: Villas de Guillen H9" maxLength={150} className="bg-light" />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCIÓN 3: DATOS ACADÉMICOS Y EMERGENCIA --- */}
                  <h5 className="mb-3 mt-4 fw-bold border-bottom pb-2" style={{ color: '#003366' }}>3. Datos Académicos y Emergencia</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Sede / Campus</Form.Label>
                        <Form.Select name="id_sede" required className="bg-light">
                          <option value="">Selecciona tu campus...</option>
                          <option value="1">Campus Villa Nueva</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Facultad</Form.Label>
                        <Form.Select name="id_facultad" required className="bg-light">
                          <option value="">Selecciona tu facultad...</option>
                          <option value="1">Ingeniería en Sistemas</option>
                          <option value="2">Ingeniería Civil</option>
                          <option value="3">Ciencias de la Administración</option>
                          <option value="4">Ciencias Jurídicas y Sociales</option>
                          <option value="5">Psicología</option>
                          <option value="6">Arquitectura</option>
                          <option value="7">Diseño Gráfico</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Ciclo / Semestre</Form.Label>
                        <Form.Select name="id_ciclo" required className="bg-light">
                          <option value="">Selecciona...</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={i+1}>Ciclo {i+1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Sección Principal (Base)</Form.Label>
                        <Form.Select name="id_seccion" required className="bg-light">
                          <option value="">Selecciona...</option>
                          <option value="1">A</option>
                          <option value="2">B</option>
                          <option value="3">C</option>
                          <option value="4">D</option>
                          <option value="5">E</option>
                          <option value="6">U</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Jornada</Form.Label>
                        <Form.Select name="id_jornada" required className="bg-light">
                          <option value="">Selecciona...</option>
                          <option value="1">Matutina</option>
                          <option value="2">Vespertina</option>
                          <option value="3">Sábado</option>
                          <option value="4">Domingo</option>
                          <option value="5">Nocturna</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-danger">Contacto de Emergencia</Form.Label>
                        <Form.Control name="emergencia_nombre" type="text" required placeholder="Nombre completo de familiar" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-danger">Teléfono de Emergencia</Form.Label>
                        <Form.Control name="emergencia_telefono" type="tel" required placeholder="Teléfono" pattern="[0-9]{8}" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" type="submit" size="lg" style={{ backgroundColor: '#003366', border: 'none' }}>
                      Completar Registro
                    </Button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <span className="text-muted">¿Ya tienes una cuenta? </span>
                    <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#003366' }}>
                      Inicia Sesión aquí
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