import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { House, CarFront, FileEarmarkText, DoorOpen, List, PersonCircle } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();
  // Estado para guardar el nombre del estudiante
  const [nombreUsuario, setNombreUsuario] = useState('Estudiante');

  // --- MÓDULO DE SEGURIDAD Y BIENVENIDA ---
  useEffect(() => {
    // 1. Verificamos si hay un usuario logueado en la memoria del navegador
    const usuarioLogueadoStr = localStorage.getItem('usuarioParqueo');
    
    // 2. Si NO hay nadie logueado, lo expulsamos al Login
    if (!usuarioLogueadoStr) {
      console.log('⛔ Intento de acceso sin login. Redirigiendo...');
      navigate('/login');
      return;
    }

    // 3. Si SÍ hay nadie logueado, leemos sus datos
    const usuarioLogueado = JSON.parse(usuarioLogueadoStr);
    // Tomamos solo el primer nombre
    setNombreUsuario(usuarioLogueado.nombres.split(' ')[0]);

  }, [navigate]);

  // --- FUNCIÓN PARA CERRAR SESIÓN (LOGOUT) ---
  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: "Tocarás que volver a ingresar tus credenciales para acceder.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003366', // Azul UMG
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#001224'
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Borramos la memoria del navegador
        localStorage.removeItem('usuarioParqueo');
        
        // 2. Mostramos confirmación rápida
        Swal.fire({
          title: 'Sesión Cerrada',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          // 3. Mandamos al usuario al Login
          navigate('/login');
        });
      }
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7f9' }}>
      
      {/* 📘 1. SIDEBAR IZQUIERDO (Estilo MiUMG) */}
      <div style={{ width: '250px', backgroundColor: '#001224', color: 'white', display: 'flex', flexDirection: 'column' }}>
        
        {/* Logo/Título UMG */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="text-center">
          <h3 className="fw-bold mb-0" style={{ color: '#ffc107' }}>Parqueo</h3>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>UNIVERSIDAD MARIANO GÁLVEZ</span>
        </div>

        {/* Links del Menú (Sprint 2) */}
        <Nav className="flex-column" style={{ padding: '20px 0', flexGrow: 1 }}>
          <Nav.Link href="#inicio" className="text-white d-flex align-items-center" style={{ padding: '12px 25px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <House size={20} className="me-3 text-warning" /> Inicio (Dashboard)
          </Nav.Link>
          <Nav.Link href="#vehiculos" className="text-white d-flex align-items-center" style={{ padding: '12px 25px' }}>
            <CarFront size={20} className="me-3" /> Mis Vehículos
          </Nav.Link>
          <Nav.Link href="#marbete" className="text-white d-flex align-items-center" style={{ padding: '12px 25px' }}>
            <FileEarmarkText size={20} className="me-3" /> Estado de Marbete
          </Nav.Link>
        </Nav>

        {/* Botón de Logout hasta abajo */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button variant="link" className="text-danger d-flex align-items-center w-100 text-decoration-none p-0" onClick={handleLogout}>
            <DoorOpen size={20} className="me-3" /> Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* ⚪ 2. ÁREA DE TRABAJO (White Content Area) */}
      <div style={{ flexGrow: 1 }}>
        
        {/* 顶部 Barra (Topbar) */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e1e6eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="d-flex align-items-center">
            <List size={24} className="me-3 text-muted" style={{ cursor: 'pointer' }} />
            {/* El Clic para colapsar menú se programa en Sprint 2 si quieres */}
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">Campus Villa Nueva</span>
            <PersonCircle size={30} className="text-primary" />
          </div>
        </div>

        {/* 📝 Contenido Principal */}
        <Container fluid style={{ padding: '30px' }}>
          
          {/* Bienvenida estilo MiUMG */}
          <div className="mb-4">
            <h2 className="fw-bold" style={{ color: '#001224' }}>Buenas tardes, {nombreUsuario}</h2>
          </div>

          {/* Tarjetas de Información Rápida (Estilo de la U) */}
          <Row>
            {/* Tarjeta de Vehículos (Ejemplo Sprint 2) */}
            <Col md={4} className="mb-4">
              <Card className="shadow-sm border-0 rounded-3 h-100">
                <Card.Body className="d-flex align-items-center p-4">
                  <div style={{ backgroundColor: '#e0f3ff', padding: '15px', borderRadius: '12px' }}>
                    <CarFront size={30} className="text-primary" />
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Vehículos Registrados</h6>
                    <h3 className="fw-bold mb-0" style={{ color: '#003366' }}>1</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta de Estado (Ejemplo Sprint 2) */}
            <Col md={4} className="mb-4">
              <Card className="shadow-sm border-0 rounded-3 h-100" style={{ borderLeft: '5px solid #28a745' }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="ms-2">
                    <h6 className="text-muted mb-1">Estado de Acceso</h6>
                    <h3 className="fw-bold text-success mb-0">ACTIVO</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Mensaje de Info (Opcional, estilo UMG) */}
          <Row className="mt-2">
            <Col md={12}>
              <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: '#d1e7dd', color: '#0f5132' }}>
                <Card.Body>
                  <Card.Title className="fw-bold">🚨 Recordatorio de Seguridad</Card.Title>
                  <Card.Text>
                    Recuerda que tu tarjeta de acceso es personal e intransferible. Si la pierdes, notifícalo inmediatamente en Administración.
                  </Card.Text>
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