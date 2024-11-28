"use client"; 

import React from 'react';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Algo salió mal!</h2>
            <img 
                src="https://www.antevenio.com/wp-content/uploads/2017/08/Bluedaniel-768x324.png" 
                alt="Error 404" 
                style={{ maxWidth: '80%', height: 'auto', margin: '0 auto', width: '100%' }}
            />
        </div>
    );
};

export default NotFound;
