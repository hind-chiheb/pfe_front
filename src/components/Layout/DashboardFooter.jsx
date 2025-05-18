// ----------------------------------------------------------------------------------
// FILE: src/components/Layout/DashboardFooter.jsx
// ----------------------------------------------------------------------------------
import React from 'react';
import Message from '../UI/Message';

function DashboardFooter({ statusMessageText, statusMessageType }) {
    return (
        <footer>
            <Message id="status-message" text={statusMessageText} type={statusMessageType} />
        </footer>
    );
}
export default DashboardFooter;
