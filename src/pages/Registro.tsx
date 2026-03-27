import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {
  const navigate = useNavigate();

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
          text: 'Tu usuario ha sido creado en la base de datos oficial. Ya puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ir al Login',
          confirmButtonColor: '#1A6AA6',
          background: '#ffffff',
          color: '#1F4E79'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
        Swal.fire({
          title: '¡Error en el Registro!',
          text: data.error || 'Hubo un problema al guardar tus datos.',
          icon: 'error',
          confirmButtonText: 'Revisar datos',
          confirmButtonColor: '#C7352E'
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        title: 'Error de Servidor',
        text: 'No se pudo conectar con el servidor de base de datos.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#C7352E'
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#E8ECF0', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 animate-fade-in-up" style={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)'
            }}>
              {/* Gradient accent bar */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #20A4D6, #00CCFF, #20A4D6)' }} />
              
              <Card.Body className="p-5" style={{ background: '#fff' }}>
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1" style={{ color: '#1A6AA6', fontSize: '1.5rem' }}>
                    Registro de Parqueo UMG
                  </h2>
                  <p style={{ color: '#8896a6', fontSize: '0.88rem' }}>
                    Completa tu ficha para obtener acceso a las instalaciones
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <input type="hidden" name="id_rol" value="1" />

                  {/* --- SECCION 1: DATOS PERSONALES --- */}
                  <h5 className="fw-bold section-divider" style={{ fontSize: '0.95rem' }}>1. Datos Personales</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control name="nombres" type="text" required placeholder="Ej: Juan Carlos" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control name="apellidos" type="text" required placeholder="Ej: Pérez Gómez" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Número de Carné</Form.Label>
                        <Form.Control name="carne" type="text" required placeholder="Ej: 5190-24-1234" pattern="[0-9]{4}-[0-9]{2}-[0-9]{1,6}" title="Formato válido: 0000-00-0000" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teléfono Celular</Form.Label>
                        <Form.Control name="telefonos" type="tel" required placeholder="Ej: 55554444" pattern="[0-9]{8}" title="Debe contener exactamente 8 dígitos" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Correo Institucional</Form.Label>
                        <Form.Control name="correo_electronico" type="email" required placeholder="usuario@miumg.edu.gt" pattern=".+@miumg\.edu\.gt" title="Debe ser un correo válido de @miumg.edu.gt" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control name="password" type="password" required placeholder="Mínimo 8 caracteres" minLength={8} />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCION 2: DIRECCION --- */}
                  <h5 className="fw-bold section-divider mt-4" style={{ fontSize: '0.95rem' }}>2. Ubicación Geográfica</h5>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Municipio de Residencia</Form.Label>
                        <Form.Select name="id_municipio" required>
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
                        <Form.Label>Zona</Form.Label>
                        <Form.Select name="zona">
                          <option value="">No aplica</option>
                          {[...Array(25)].map((_, i) => (
                            <option key={i+1} value={i+1}>Zona {i+1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nomenclatura</Form.Label>
                        <Form.Control name="nomenclatura" type="text" required placeholder="Ej: Villas de Guillen H9" maxLength={150} />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- SECCION 3: DATOS ACADEMICOS --- */}
                  <h5 className="fw-bold section-divider mt-4" style={{ fontSize: '0.95rem' }}>3. Datos Académicos y Emergencia</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sede / Campus</Form.Label>
                        <Form.Select name="id_sede" required>
                          <option value="">Selecciona tu campus...</option>
                          <option value="1">Campus Villa Nueva</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Facultad</Form.Label>
                        <Form.Select name="id_facultad" required>
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
                        <Form.Label>Ciclo / Semestre</Form.Label>
                        <Form.Select name="id_ciclo" required>
                          <option value="">Selecciona...</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={i+1}>Ciclo {i+1}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sección Principal</Form.Label>
                        <Form.Select name="id_seccion" required>
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
                        <Form.Label>Jornada</Form.Label>
                        <Form.Select name="id_jornada" required>
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
                        <Form.Label style={{ color: '#C7352E' }}>Contacto de Emergencia</Form.Label>
                        <Form.Control name="emergencia_nombre" type="text" required placeholder="Nombre completo de familiar" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#C7352E' }}>Teléfono de Emergencia</Form.Label>
                        <Form.Control name="emergencia_telefono" type="tel" required placeholder="Teléfono" pattern="[0-9]{8}" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid mt-4">
                    <Button type="submit" size="lg" style={{ 
                      background: 'linear-gradient(135deg, #1A6AA6 0%, #20A4D6 100%)', 
                      border: 'none',
                      fontSize: '0.95rem',
                      padding: '0.75rem'
                    }}>
                      Completar Registro
                    </Button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <span style={{ color: '#8896a6', fontSize: '0.88rem' }}>¿Ya tienes una cuenta? </span>
                    <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#1A6AA6', fontSize: '0.88rem' }}>
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