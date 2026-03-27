import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function LoginAdmin() {
  const navigate = useNavigate();

  const handleLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Validando correo de administrador en Oracle...");
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(160deg, #0a1628 0%, #1F4E79 40%, #003366 70%, #0d2137 100%)',
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,204,255,0.06) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            
            <div className="mb-3 animate-fade-in"
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', 
                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', transition: 'color 0.3s ease' }}
              onClick={() => navigate('/')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00CCFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <ArrowLeft size={14} /> Regresar a selección de rol
            </div>

            <Card className="border-0 animate-fade-in" style={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)'
            }}>
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #20A4D6, #00CCFF, #20A4D6)' }} />
              
              <Card.Body className="p-4 pt-5 pb-5" style={{ background: '#fff' }}>
                
                <div className="text-center mb-4">
                  <div className="logo-container mb-3">
                    <img src="/logo.png" alt="Logo UMG" className="logo-img-sm" />
                  </div>
                  <h3 className="fw-bold mb-1" style={{ color: '#1A6AA6', fontSize: '1.35rem' }}>
                    Acceso Administrativo
                  </h3>
                  <p style={{ color: '#8896a6', fontSize: '0.88rem', marginBottom: 0 }}>
                    Colaboradores del sistema de parqueo
                  </p>
                </div>

                <Form onSubmit={handleLoginAdmin}>
                  <Form.Group className="mb-3" controlId="formCorreoAdmin">
                    <Form.Label>Correo Electrónico Institucional</Form.Label>
                    <Form.Control 
                      type="email" placeholder="usuario@miumg.edu.gt" required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPasswordAdmin">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                      type="password" placeholder="********" required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3 fw-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, #1A6AA6 0%, #20A4D6 100%)', 
                      border: 'none',
                      fontSize: '0.95rem',
                      padding: '0.7rem'
                    }}
                  >
                    Ingresar a Gestión de Parqueo
                  </Button>

                  <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid #edf0f3' }}>
                    <p className="mb-0" style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      El acceso administrativo es asignado por el departamento de IT. Si no tienes acceso, contacta a soporte.
                    </p>
                  </div>
                </Form>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
}