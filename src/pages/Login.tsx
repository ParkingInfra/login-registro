import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const credenciales = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuarioParqueo', JSON.stringify(data.usuario));
        const primerNombre = data.usuario.nombres.split(' ')[0];

        Swal.fire({
          title: `¡Bienvenido, ${primerNombre}!`,
          text: 'Autenticación exitosa. Redirigiendo al sistema...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#ffffff',
          color: '#1F4E79'
        }).then(() => {
          navigate('/dashboard');
        });

      } else {
        Swal.fire({
          title: 'Acceso Denegado',
          text: data.error || 'Carné o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#1A6AA6'
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        title: 'Error de Servidor',
        text: 'No se pudo conectar con la base de datos Oracle.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#C7352E'
      });
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(160deg, #0a1628 0%, #1F4E79 40%, #003366 70%, #0d2137 100%)',
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,204,255,0.06) 0%, transparent 70%)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,106,166,0.08) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <Card className="border-0 animate-fade-in" style={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)'
            }}>
              {/* Gradient accent bar */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #20A4D6, #00CCFF, #20A4D6)' }} />
              
              <Card.Body className="p-4 pt-5 pb-5" style={{ background: '#fff' }}>
                <div className="text-center mb-4">
                  <div className="logo-container mb-3">
                    <img src="/logo.png" alt="Logo UMG" className="logo-img-sm" />
                  </div>
                  <h2 className="fw-bold mb-1" style={{ 
                    color: '#1A6AA6', fontSize: '1.5rem'
                  }}>
                    MiUMG Parqueo
                  </h2>
                  <p style={{ color: '#8896a6', fontSize: '0.88rem', marginBottom: 0 }}>
                    Portal de acceso para estudiantes
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Número de Carné</Form.Label>
                    <Form.Control 
                      name="carne" type="text" required 
                      placeholder="Ej: 5190-24-1234" 
                      pattern="[0-9]{4}-[0-9]{2}-[0-9]{1,6}" 
                      title="Formato válido: 0000-00-0000"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                      name="password" type="password" required 
                      placeholder="Ingresa tu contraseña"
                    />
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button type="submit" size="lg" style={{ 
                      background: 'linear-gradient(135deg, #1A6AA6 0%, #20A4D6 100%)', 
                      border: 'none',
                      fontSize: '0.95rem',
                      padding: '0.75rem'
                    }}>
                      Iniciar Sesión
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <span style={{ color: '#8896a6', fontSize: '0.88rem' }}>¿Aún no tienes tu acceso? </span>
                    <Link to="/registro" className="text-decoration-none fw-bold" style={{ color: '#1A6AA6', fontSize: '0.88rem' }}>
                      Regístrate aquí
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

export default Login;