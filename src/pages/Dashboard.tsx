import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { House, CarFront, FileEarmarkText, DoorOpen, List, PersonCircle, ExclamationTriangleFill, ShieldCheck, ArrowRight } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('Estudiante');

  useEffect(() => {
    const usuarioLogueadoStr = localStorage.getItem('usuarioParqueo');
    
    if (!usuarioLogueadoStr) {
      console.log('[WARN] Intento de acceso sin login. Redirigiendo...');
      navigate('/login');
      return;
    }

    const usuarioLogueado = JSON.parse(usuarioLogueadoStr);
    setNombreUsuario(usuarioLogueado.nombres.split(' ')[0]);
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: "Tocarás que volver a ingresar tus credenciales para acceder.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1A6AA6',
      cancelButtonColor: '#C7352E',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#1F4E79'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('usuarioParqueo');
        Swal.fire({
          title: 'Sesión Cerrada',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  // Saludo dinámico
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#E8ECF0' }}>
      
      {/* SIDEBAR */}
      <div style={{ 
        width: '260px', 
        background: 'linear-gradient(180deg, #0d2137 0%, #003366 100%)',
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}>
        
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="text-center">
          <h3 className="fw-bold mb-1" style={{ 
            color: '#00CCFF', fontSize: '1.3rem', letterSpacing: '-0.01em' 
          }}>
            Parqueo
          </h3>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Universidad Mariano Gálvez
          </span>
        </div>

        {/* Navigation */}
        <Nav className="flex-column" style={{ padding: '16px 0', flexGrow: 1 }}>
          <Nav.Link href="#inicio" className="sidebar-link active text-white d-flex align-items-center" style={{ padding: '11px 20px' }}>
            <House size={18} className="me-3" style={{ color: '#00CCFF' }} /> 
            <span style={{ fontSize: '0.88rem' }}>Inicio</span>
          </Nav.Link>
          <Nav.Link href="#vehiculos" className="sidebar-link text-white d-flex align-items-center" style={{ padding: '11px 20px' }}>
            <CarFront size={18} className="me-3" style={{ opacity: 0.5 }} /> 
            <span style={{ fontSize: '0.88rem' }}>Mis Vehículos</span>
          </Nav.Link>
          <Nav.Link href="#marbete" className="sidebar-link text-white d-flex align-items-center" style={{ padding: '11px 20px' }}>
            <FileEarmarkText size={18} className="me-3" style={{ opacity: 0.5 }} /> 
            <span style={{ fontSize: '0.88rem' }}>Estado de Marbete</span>
          </Nav.Link>
        </Nav>

        {/* Logout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Button variant="link" className="d-flex align-items-center w-100 text-decoration-none p-0" 
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', transition: 'color 0.3s ease' }}
            onClick={handleLogout}
            onMouseEnter={(e) => e.currentTarget.style.color = '#C7352E'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <DoorOpen size={18} className="me-3" /> Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Topbar */}
        <div style={{ 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #e2e8f0', 
          padding: '12px 28px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div className="d-flex align-items-center">
            <List size={22} style={{ cursor: 'pointer', color: '#94a3b8' }} />
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Campus Villa Nueva</span>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1A6AA6, #20A4D6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <PersonCircle size={20} style={{ color: '#fff' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <Container fluid style={{ padding: '28px' }}>
          
          {/* Greeting */}
          <div className="mb-4 animate-fade-in">
            <h2 className="fw-bold mb-1" style={{ color: '#1F4E79', fontSize: '1.55rem' }}>
              {saludo}, {nombreUsuario}
            </h2>
            <p style={{ color: '#8896a6', fontSize: '0.88rem', marginBottom: 0 }}>
              Bienvenido al sistema de gestión de parqueo universitario.
            </p>
          </div>

          {/* Stat Cards */}
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="border-0 h-100 card-hover-lift" style={{ 
                borderRadius: '14px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="stat-icon-box" style={{ background: 'linear-gradient(135deg, #E0F4FF, #CCF2FF)' }}>
                    <CarFront size={26} style={{ color: '#1A6AA6' }} />
                  </div>
                  <div className="ms-3">
                    <p className="mb-0" style={{ fontSize: '0.78rem', color: '#8896a6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Vehículos</p>
                    <h3 className="fw-bold mb-0" style={{ color: '#1A6AA6', fontSize: '1.6rem' }}>1</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="border-0 h-100 card-hover-lift" style={{ 
                borderRadius: '14px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #20A4D6',
                overflow: 'hidden'
              }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="stat-icon-box" style={{ background: 'linear-gradient(135deg, #D4F5E9, #C6F0DF)' }}>
                    <ShieldCheck size={26} style={{ color: '#059669' }} />
                  </div>
                  <div className="ms-3">
                    <p className="mb-0" style={{ fontSize: '0.78rem', color: '#8896a6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Estado de Acceso</p>
                    <h3 className="fw-bold mb-0" style={{ color: '#059669', fontSize: '1.6rem' }}>ACTIVO</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="border-0 h-100 card-hover-lift" style={{ 
                borderRadius: '14px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <Card.Body className="d-flex align-items-center justify-content-between p-4">
                  <div className="d-flex align-items-center">
                    <div className="stat-icon-box" style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFECCD)' }}>
                      <FileEarmarkText size={26} style={{ color: '#D97706' }} />
                    </div>
                    <div className="ms-3">
                      <p className="mb-0" style={{ fontSize: '0.78rem', color: '#8896a6', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Marbete</p>
                      <h3 className="fw-bold mb-0" style={{ color: '#D97706', fontSize: '1.6rem' }}>Vigente</h3>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: '#c4cdd5' }} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Info Banner */}
          <Row>
            <Col md={12}>
              <div className="info-banner d-flex align-items-start gap-3" 
                style={{ backgroundColor: '#EFF8F4', borderLeftColor: '#20A4D6', borderRadius: '12px' }}>
                <div className="stat-icon-box" style={{ 
                  background: 'linear-gradient(135deg, #D4F5E9, #C6F0DF)',
                  width: '42px', height: '42px', minWidth: '42px', borderRadius: '10px'
                }}>
                  <ExclamationTriangleFill size={18} style={{ color: '#059669' }} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: '#1F4E79', fontSize: '0.9rem' }}>
                    Recordatorio de Seguridad
                  </h6>
                  <p className="mb-0" style={{ color: '#5a6c7d', fontSize: '0.84rem', lineHeight: '1.55' }}>
                    Recuerda que tu tarjeta de acceso es personal e intransferible. Si la pierdes, notifícalo inmediatamente en Administración.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

        </Container>
      </div>

    </div>
  );
};

export default Dashboard;