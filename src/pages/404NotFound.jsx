import React from 'react';
import { Link } from 'react-router-dom';

    const NotFound = () => (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f8f8',
            color: '#333'
        }}>
            <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <p>Creaciones AxJey te ofrece una variedad de productos únicos y personalizados.</p>
            <Link to="/" style={{
                marginTop: '1rem',
                padding: '0.5rem 1.5rem',
                background: '#ff4081',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none'
            }}>
                Volver al inicio
            </Link>
        </div>
    );

    export default NotFound;