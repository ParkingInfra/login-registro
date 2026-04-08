import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css'; 

const LoginAdmin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const credenciales = Object.fromEntries(formData.entries());

    try {
      // OJO: Aquí podríamos apuntar a una ruta específica como /api/auth/login-admin
      // o usar la misma y que Node.js verifique el id_rol. Por ahora usamos la misma.
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales),
      });

      const data = await response.json();

      if (response.ok) {
        // Validación de seguridad extra en el Frontend (Opcional, pero recomendada)
        // Asumiendo que el rol 1 es Estudiante y roles > 1 son Admin/Gestión
        if (data.usuario.rol === 1) {
          Swal.fire({
            title: 'Acceso Restringido',
            text: 'Esta área es solo para personal administrativo.',
            icon: 'warning',
            confirmButtonColor: 'var(--rojo-institucional)'
          });
          return; // Detenemos la ejecución aquí
        }

        localStorage.setItem('usuarioAdmin', JSON.stringify(data.usuario));
        const primerNombre = data.usuario.nombres.split(' ')[0];

        Swal.fire({
          title: `¡Hola de nuevo, ${primerNombre}!`,
          text: 'Acceso concedido al panel de administración.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: 'var(--fondo-blanco)',
          color: 'var(--azul-oscuro)'
        }).then(() => {
          // Lo mandamos al dashboard (luego podemos hacer un Dashboard exclusivo de Admin)
          navigate('/dashboard'); 
        });

      } else {
        Swal.fire({
          title: 'Acceso Denegado',
          text: data.error || 'Credenciales administrativas incorrectas.',
          icon: 'error',
          confirmButtonText: 'Reintentar',
          confirmButtonColor: 'var(--rojo-institucional)'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error de Servidor',
        text: 'No se pudo conectar con el servidor central.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'var(--rojo-institucional)'
      });
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--fondo-general)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Círculos decorativos usando tonos más serios para el Admin */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px',
        borderRadius: '50%', background: 'radial-gradient(circle, var(--fondo-banner) 0%, transparent 70%)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px',
        borderRadius: '50%', background: 'radial-gradient(circle, var(--fondo-curvas) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            
            <div className="text-center mb-3">
              <Link to="/" className="text-decoration-none" style={{ 
                color: 'var(--azul-oscuro)', 
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                &larr; Regresar a selección de rol
              </Link>
            </div>

            <Card className="border-0 shadow-lg" style={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              backgroundColor: 'var(--fondo-blanco)'
            }}>
              {/* Barra de acento con Azul Institucional Oscuro */}
              <div style={{ height: '5px', backgroundColor: 'var(--azul-oscuro)' }} />
              
              <Card.Body className="p-4 pt-5 pb-5">
                <div className="text-center mb-4">
                  <div className="logo-container mb-3">
                    {/* 🔥 LA CURA DEL LOGO GIGANTE 🔥 */}
                    <img src="/logo.png" alt="Logo UMG" style={{ width: '110px', height: 'auto', opacity: '0.9' }} />
                  </div>
                  <h2 className="mb-1" style={{ color: 'var(--azul-oscuro)' }}>
                    Portal Administrativo
                  </h2>
                  <p style={{ color: 'var(--azul-universitario)', fontSize: '0.88rem', marginBottom: 0 }}>
                    Gestión de Parqueo UMG
                  </p>
                </div>

                <Form onSubmit={handleSubmit} style={{ fontFamily: 'var(--fuente-principal)' }}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold" style={{ color: '#333' }}>Correo Electrónico Institucional</Form.Label>
                    <Form.Control 
                      name="correo_electronico"
                      type="email" 
                      required 
                      placeholder="usuario@miumg.edu.gt" 
                      className="py-2 bg-light"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: 'var(--azul-oscuro)', fontWeight: 'bold' }}>Contraseña de Seguridad</Form.Label>
                    <Form.Control 
                      name="password" type="password" required 
                      placeholder="Ingresa tu contraseña"
                    />
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button type="submit" size="lg" style={{ 
                      backgroundColor: 'var(--azul-oscuro)', 
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      padding: '0.75rem',
                      fontFamily: 'var(--fuente-titulos)',
                      fontStyle: 'italic'
                    }}>
                      Acceder a Gestión
                    </Button>
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

export default LoginAdmin;