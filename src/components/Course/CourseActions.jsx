// ----------------------------------------------------------------------------------
// FILE: src/components/Course/CourseActions.jsx
// ----------------------------------------------------------------------------------
import React from 'react';

function CourseActions({ courseId, statusType, onEnroll, onDisenroll, onMarkFinished }) {
    return (
        <div className="course-actions">
            {statusType === 'available' && (
                <button className="enroll-button" onClick={() => onEnroll(courseId)}>Enroll</button>
            )}
            {statusType === 'enrolled' && (
                <>
                    <button className="mark-finished-button" onClick={() => onMarkFinished(courseId)}>Mark as Finished</button>
                    <button className="disenroll-button" onClick={() => onDisenroll(courseId)}>Disenroll</button>
                </>
            )}
            {statusType === 'finished' && <span className="status-badge">Completed</span>}
        </div>
    );
}
export default CourseActions;
