import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Capturamos los datos del formulario (Carné y Contraseña)
    const formData = new FormData(e.currentTarget);
    const credenciales = Object.fromEntries(formData.entries());

    try {
      // Hacemos la petición al backend en Node.js
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos los datos del usuario en la memoria del navegador (Vital para el Dashboard)
        localStorage.setItem('usuarioParqueo', JSON.stringify(data.usuario));

        // Extraemos solo el primer nombre para que el saludo sea amigable
        const primerNombre = data.usuario.nombres.split(' ')[0];

        // Alerta de éxito elegante
        Swal.fire({
          title: `¡Bienvenido, ${primerNombre}!`,
          text: 'Autenticación exitosa. Redirigiendo al sistema...',
          icon: 'success',
          timer: 1500, // Se cierra solita en 1.5 segundos
          showConfirmButton: false,
          background: '#ffffff',
          color: '#001224'
        }).then(() => {
          navigate('/dashboard'); // ¡Hacia la nueva pantalla del Sprint 2!
        });

      } else {
        // Alerta de credenciales incorrectas (Protección contra intrusos)
        Swal.fire({
          title: 'Acceso Denegado',
          text: data.error || 'Carné o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#003366'
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        title: 'Error de Servidor',
        text: 'No se pudo conectar con la base de datos Oracle.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#001224', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  {/* Aquí pueden poner el logo real de la UMG si lo tienen en la carpeta public */}
                  <h2 className="fw-bold" style={{ color: '#003366' }}>MiUMG Parqueo</h2>
                  <p className="text-muted">Portal de acceso para estudiantes</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Número de Carné</Form.Label>
                    <Form.Control 
                      name="carne" 
                      type="text" 
                      required 
                      placeholder="Ej: 5190-24-1234" 
                      pattern="[0-9]{4}-[0-9]{2}-[0-9]{1,6}" 
                      title="Formato válido: 0000-00-0000"
                      className="bg-light py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Contraseña</Form.Label>
                    <Form.Control 
                      name="password" 
                      type="password" 
                      required 
                      placeholder="Ingresa tu contraseña" 
                      className="bg-light py-2"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" type="submit" size="lg" style={{ backgroundColor: '#003366', border: 'none' }}>
                      Iniciar Sesión
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <span className="text-muted">¿Aún no tienes tu acceso? </span>
                    <Link to="/registro" className="text-decoration-none fw-bold" style={{ color: '#003366' }}>
                      Regístrate aquí
                    </Link>
                  </div>
                  
                  {/* Botón para regresar al selector si tienen uno */}
                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none text-secondary" style={{ fontSize: '0.9rem' }}>
                      ← Volver al inicio
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