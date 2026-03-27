import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, Building, GearWideConnected, ChevronRight } from 'react-bootstrap-icons';

export default function SelectorRol() {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(160deg, #0a1628 0%, #1F4E79 40%, #003366 70%, #0d2137 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background circles */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px', width: '400px', height: '400px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,204,255,0.08) 0%, transparent 70%)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,106,166,0.1) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="mb-5 text-center animate-fade-in">
          <Col>
            <div className="logo-container mb-4">
              <img 
                src="/logo.png" 
                alt="Logo UMG" 
                className="logo-img"
              />
            </div>
            <h2 className="fw-bold mb-2" style={{ fontSize: '1.75rem', letterSpacing: '-0.01em' }}>
              Selecciona tipo de Usuario
            </h2>
            <p className="text-decorative mb-0" style={{ fontSize: '1.6rem', color: '#00CCFF', opacity: 0.9 }}>
              Sistema de Parqueo UMG
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center g-4 stagger-children">
          
          {/* Tarjeta 1: Estudiante / Catedratico */}
          <Col md={4} lg={3}>
            <Card 
              className="h-100 text-white border-0 card-hover-lift animate-fade-in-up" 
              style={{ 
                cursor: 'pointer', 
                background: 'linear-gradient(145deg, rgba(10, 35, 65, 0.85) 0%, rgba(0, 51, 102, 0.7) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '18px',
                overflow: 'hidden'
              }}
              onClick={() => navigate('/login')}
            >
              <div style={{ 
                height: '3px', 
                background: 'linear-gradient(90deg, #20A4D6, #00CCFF)',
                width: '100%'
              }} />
              <Card.Body className="p-4 d-flex flex-column justify-content-center text-center">
                <div className="mx-auto mb-3" style={{ 
                  width: '64px', height: '64px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(0,204,255,0.15), rgba(32,164,214,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <PersonCircle size={32} style={{ color: '#00CCFF' }} />
                </div>
                <h5 className="fw-bold mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.01em' }}>
                  Estudiante / Catedrático
                </h5>
                <p className="mb-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  Ingreso con carné para alumnos y docentes activos.
                </p>
                <div style={{ color: '#00CCFF', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                  ACCEDER <ChevronRight size={12} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta 2: Administrativo */}
          <Col md={4} lg={3}>
            <Card 
              className="h-100 text-white border-0 card-hover-lift animate-fade-in-up" 
              style={{ 
                cursor: 'pointer', 
                background: 'linear-gradient(145deg, rgba(10, 35, 65, 0.85) 0%, rgba(0, 51, 102, 0.7) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '18px',
                overflow: 'hidden'
              }}
              onClick={() => navigate('/login-admin')}
            >
              <div style={{ 
                height: '3px', 
                background: 'linear-gradient(90deg, #20A4D6, #00CCFF)',
                width: '100%'
              }} />
              <Card.Body className="p-4 d-flex flex-column justify-content-center text-center">
                <div className="mx-auto mb-3" style={{ 
                  width: '64px', height: '64px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(0,204,255,0.15), rgba(32,164,214,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Building size={32} style={{ color: '#00CCFF' }} />
                </div>
                <h5 className="fw-bold mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.01em' }}>
                  Administrativo
                </h5>
                <p className="mb-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  Ingreso con correo para colaboradores de parqueo.
                </p>
                <div style={{ color: '#00CCFF', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                  ACCEDER <ChevronRight size={12} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta 3: Gestion de Usuarios (RRHH) - Funcionalidad Simulada */}
          <Col md={4} lg={3}>
            <Card 
              className="h-100 text-white animate-fade-in-up" 
              style={{ 
                background: 'rgba(10, 25, 50, 0.4)',
                border: '1.5px dashed rgba(255,255,255,0.15)', 
                cursor: 'not-allowed',
                borderRadius: '18px',
                overflow: 'hidden'
              }}
              onClick={() => alert('Este módulo corresponde a RRHH. Fuera del alcance del Sprint 1, pero contemplado en la arquitectura.')}
            >
              <Card.Body className="p-4 d-flex flex-column justify-content-center text-center" style={{ opacity: 0.55 }}>
                <div className="mx-auto mb-3" style={{ 
                  width: '64px', height: '64px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <GearWideConnected size={32} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </div>
                <h5 className="fw-bold mb-2" style={{ fontSize: '1.05rem' }}>Gestión de Usuarios</h5>
                <p className="mb-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', lineHeight: '1.5' }}>
                  Acceso restringido para creación de cuentas administrativas.
                </p>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                  PROXIMAMENTE
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}