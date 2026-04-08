import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { House, CarFront, FileEarmarkText, DoorOpen, List, PersonCircle, Bell } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('Estudiante');

  useEffect(() => {
    // Lógica de seguridad (lista para cuando pruebes el backend jaja)
    const usuarioLogueadoStr = localStorage.getItem('usuarioParqueo');
    if (!usuarioLogueadoStr) {
      navigate('/login');
      return;
    }
    const usuarioLogueado = JSON.parse(usuarioLogueadoStr);
    setNombreUsuario(usuarioLogueado.nombres.split(' ')[0]);
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: "Tendrás que volver a ingresar tus credenciales.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--azul-universitario)',
      cancelButtonColor: 'var(--rojo-institucional)',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: 'var(--fondo-blanco)',
      color: 'var(--azul-oscuro)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('usuarioParqueo');
        navigate('/login');
      }
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--fondo-general)', fontFamily: 'var(--fuente-principal)' }}>
      
      {/* 📘 1. SIDEBAR IZQUIERDO (Azul Institucional Oscuro) */}
      <div style={{ 
        width: '260px', 
        backgroundColor: 'var(--azul-oscuro)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        zIndex: 10
      }}>
        
        {/* Título UMG */}
        <div style={{ padding: '25px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="text-center">
          <h3 className="mb-0" style={{ fontFamily: 'var(--fuente-titulos)', fontStyle: 'italic', color: 'var(--azul-celeste-v2)' }}>
            MiUMG
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--fondo-curvas)', letterSpacing: '1px' }}>CONTROL DE PARQUEO</span>
        </div>

        {/* Links del Menú */}
        <Nav className="flex-column mt-3" style={{ flexGrow: 1, padding: '0 10px' }}>
          <Nav.Link href="#inicio" className="text-white d-flex align-items-center mb-2 rounded" style={{ padding: '12px 20px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <House size={20} className="me-3" style={{ color: 'var(--azul-celeste-v2)' }} /> Inicio
          </Nav.Link>
          <Nav.Link href="#vehiculos" className="text-white d-flex align-items-center mb-2 rounded nav-hover" style={{ padding: '12px 20px', opacity: 0.8 }}>
            <CarFront size={20} className="me-3" /> Mis Vehículos
          </Nav.Link>
          <Nav.Link href="#marbete" className="text-white d-flex align-items-center mb-2 rounded nav-hover" style={{ padding: '12px 20px', opacity: 0.8 }}>
            <FileEarmarkText size={20} className="me-3" /> Estado de Marbete
          </Nav.Link>
        </Nav>

        {/* Botón de Logout */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button variant="link" className="d-flex align-items-center w-100 text-decoration-none p-2 rounded" 
            onClick={handleLogout}
            style={{ color: '#ff6b6b', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,0,0,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <DoorOpen size={20} className="me-3" /> Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* ⚪ 2. ÁREA DE TRABAJO */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Topbar (Barra Superior Blanca) */}
        <div style={{ backgroundColor: 'var(--fondo-blanco)', padding: '15px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <List size={26} style={{ color: 'var(--azul-oscuro)', cursor: 'pointer' }} />
          </div>
          <div className="d-flex align-items-center gap-4">
            <Bell size={20} style={{ color: 'var(--azul-universitario)', cursor: 'pointer' }} />
            <div className="d-flex align-items-center gap-2 border-start ps-3">
              <span className="fw-bold" style={{ color: 'var(--azul-oscuro)', fontSize: '0.9rem' }}>Estudiante</span>
              <PersonCircle size={32} style={{ color: 'var(--azul-universitario)' }} />
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <Container fluid style={{ padding: '40px' }}>
          
          {/* Bienvenida con Ubuntu Cursiva */}
          <div className="mb-4 d-flex justify-content-between align-items-end">
            <div>
              <h2 className="mb-1" style={{ fontFamily: 'var(--fuente-titulos)', fontStyle: 'italic', color: 'var(--azul-universitario)' }}>
                Buenas tardes, {nombreUsuario}
              </h2>
              <p className="text-muted">Resumen de tu cuenta de parqueo en Campus Villa Nueva</p>
            </div>
          </div>

          <Row className="g-4">
            {/* Tarjeta 1: Vehículos */}
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div style={{ height: '4px', backgroundColor: 'var(--azul-universitario)' }}></div>
                <Card.Body className="p-4 d-flex align-items-center">
                  <div style={{ backgroundColor: 'var(--fondo-curvas)', padding: '18px', borderRadius: '12px' }}>
                    <CarFront size={32} style={{ color: 'var(--azul-universitario)' }} />
                  </div>
                  <div className="ms-4">
                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Vehículos Registrados</p>
                    <h2 className="mb-0 fw-bold" style={{ color: 'var(--azul-oscuro)' }}>0</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta 2: Estado */}
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div style={{ height: '4px', backgroundColor: 'var(--azul-celeste-v2)' }}></div>
                <Card.Body className="p-4 d-flex align-items-center">
                  <div style={{ backgroundColor: '#e6f4ea', padding: '18px', borderRadius: '12px' }}>
                    <FileEarmarkText size={32} style={{ color: '#1e8e3e' }} />
                  </div>
                  <div className="ms-4">
                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Estado de Marbete</p>
                    <h4 className="mb-0 fw-bold" style={{ color: '#1e8e3e' }}>Pendiente</h4>
                  </div>
                </Card.Body>
              </Card>
            </Col>

             {/* Tarjeta Informativa UMG */}
             <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '15px', backgroundColor: 'var(--azul-universitario)', color: 'white' }}>
                <Card.Body className="p-4 d-flex flex-column justify-content-center">
                  <h5 style={{ fontFamily: 'var(--fuente-titulos)', fontStyle: 'italic' }}>¿Nuevo Vehículo?</h5>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Registra tu placa y sube tu tarjeta de circulación para habilitar tu acceso a la universidad.</p>
                  <Button size="sm" style={{ backgroundColor: 'var(--fondo-blanco)', color: 'var(--azul-universitario)', border: 'none', fontWeight: 'bold', width: 'fit-content' }}>
                    Registrar ahora
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  );
};

export default Dashboard;