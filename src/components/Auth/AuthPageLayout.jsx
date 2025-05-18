// ----------------------------------------------------------------------------------
// FILE: src/components/Auth/AuthPageLayout.jsx
// ----------------------------------------------------------------------------------
import React from 'react';

function AuthPageLayout({ title, children, containerClass = "login-container" }) {
    return (
        <div className={containerClass}>
            <h1>{title}</h1>
            {children}
        </div>
    );
}
export default AuthPageLayout;