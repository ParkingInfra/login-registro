import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PersonBadge, PersonGear, PeopleFill, InfoCircle, CheckCircleFill } from 'react-bootstrap-icons';

const HomeSelector = () => {
  const navigate = useNavigate();
  const [showRequisitos, setShowRequisitos] = useState(false);

  const handleClose = () => setShowRequisitos(false);
  const handleShow = () => setShowRequisitos(true);

  return (
    <div style={{ 
      backgroundColor: 'var(--fondo-general)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'var(--fuente-principal)' 
    }}>
      
      {/* --- HEADER --- */}
      <div style={{ backgroundColor: 'var(--azul-oscuro)', padding: '15px 0', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="/logo.png" alt="UMG" style={{ height: '45px', marginRight: '15px' }} />
            <h4 className="mb-0 text-white" style={{ fontFamily: 'var(--fuente-titulos)', fontStyle: 'italic' }}>
              Sistema de Control de Parqueo
            </h4>
          </div>
          <Button 
            variant="outline-light" 
            onClick={handleShow}
            className="d-flex align-items-center gap-2"
            style={{ borderRadius: '20px', fontSize: '0.9rem' }}
          >
            <InfoCircle /> Requisitos y Pagos
          </Button>
        </Container>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <div className="text-center mb-5">
            <h1 style={{ color: 'var(--azul-universitario)', fontSize: '2.5rem', marginBottom: '10px' }}>
              Bienvenido al Portal
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Selecciona tu perfil para ingresar al sistema de gestión de parqueos
            </p>
          </div>

          <Row className="g-4">
            {/* OPCIÓN 1: ESTUDIANTE / CATEDRÁTICO */}
            <Col md={4}>
              <Card 
                className="h-100 border-0 shadow-sm text-center card-hover" 
                style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                onClick={() => navigate('/login')}
              >
                <Card.Body className="p-4 d-flex flex-column align-items-center">
                  <div style={{ backgroundColor: 'var(--fondo-curvas)', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
                    <PersonBadge size={45} style={{ color: 'var(--azul-universitario)' }} />
                  </div>
                  <h4 className="fw-bold" style={{ color: 'var(--azul-oscuro)', fontSize: '1.25rem' }}>Estudiante / Catedrático</h4>
                  <p className="text-muted small mt-2">Ingresa con carné para alumnos y docentes activos.</p>
                  <Button className="mt-auto w-100" style={{ backgroundColor: 'var(--azul-universitario)', border: 'none' }}>
                    Ingresar
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* OPCIÓN 2: ADMINISTRATIVO */}
            <Col md={4}>
              <Card 
                className="h-100 border-0 shadow-sm text-center" 
                style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                onClick={() => navigate('/login-admin')}
              >
                <Card.Body className="p-4 d-flex flex-column align-items-center">
                  <div style={{ backgroundColor: 'var(--fondo-banner)', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
                    <PersonGear size={45} style={{ color: 'var(--azul-oscuro)' }} />
                  </div>
                  <h4 className="fw-bold" style={{ color: 'var(--azul-oscuro)', fontSize: '1.25rem' }}>Administrativo</h4>
                  <p className="text-muted small mt-2">Ingreso con correo para colaboradores de parqueo.</p>
                  <Button className="mt-auto w-100" style={{ backgroundColor: 'var(--azul-oscuro)', border: 'none' }}>
                    Gestionar
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* OPCIÓN 3: GESTIÓN DE USUARIOS */}
            <Col md={4}>
              <Card 
                className="h-100 border-0 shadow-sm text-center"
                style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                /* Aquí puedes poner la ruta hacia la pantalla del super admin en el futuro */
              >
                <Card.Body className="p-4 d-flex flex-column align-items-center">
                  <div style={{ backgroundColor: '#e2e3e5', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
                    <PeopleFill size={45} style={{ color: '#495057' }} />
                  </div>
                  <h4 className="fw-bold" style={{ color: 'var(--azul-oscuro)', fontSize: '1.25rem' }}>Gestión de Usuarios</h4>
                  <p className="text-muted small mt-2">Acceso restringido para creación de cuentas administrativas.</p>
                  <Button className="mt-auto w-100" variant="secondary">
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* --- FOOTER --- */}
      <div style={{ backgroundColor: 'var(--azul-marino)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <Container>
          <small>&copy; 2026 Universidad Mariano Gálvez de Guatemala - Facultad de Ingeniería</small>
        </Container>
      </div>

      {/* --- MODAL DE REQUISITOS --- */}
      <Modal show={showRequisitos} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: '3px solid var(--azul-celeste-v2)' }}>
          <Modal.Title style={{ fontFamily: 'var(--fuente-titulos)', fontStyle: 'italic', color: 'var(--azul-universitario)' }}>
            Información y Requisitos del Parqueo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            <Col md={6}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--azul-oscuro)' }}>¿Cómo crear tu cuenta?</h5>
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-success me-2 mt-1" /> Ser estudiante o catedrático activo.
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-success me-2 mt-1" /> Contar con correo institucional (@miumg.edu.gt).
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-success me-2 mt-1" /> Completar el formulario de registro con datos de emergencia.
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--azul-oscuro)' }}>Requisitos de Marbete</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-primary me-2 mt-1" /> Tarjeta de circulación vigente del vehículo.
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-primary me-2 mt-1" /> Fotografía legible de la placa.
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start border-0 px-0">
                  <CheckCircleFill className="text-primary me-2 mt-1" /> Comprobante de pago de parqueo del ciclo actual.
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--fondo-curvas)', color: 'var(--azul-oscuro)' }}>
            <strong>Nota:</strong> Los pagos se realizan únicamente a través del portal de pagos oficial de la Universidad o en agencias bancarias autorizadas.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: 'var(--azul-universitario)', border: 'none' }} onClick={handleClose}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default HomeSelector;