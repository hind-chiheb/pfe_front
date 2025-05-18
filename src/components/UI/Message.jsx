// ----------------------------------------------------------------------------------
// FILE: src/components/UI/Message.jsx
// ----------------------------------------------------------------------------------
import React from 'react';

function Message({ text, type, id }) {
    if (text === null || typeof text === 'undefined' || text === '') return null;
    if (typeof text !== 'string') {
        console.warn("Message component received non-string text prop:", text);
        return null;
    }
    const messageClass = `message-area ${type === 'error' ? 'error-message' : type === 'success' ? 'success-message' : ''}`;
    return <p id={id} className={messageClass} role="alert">{text}</p>;
}
export default Message;
