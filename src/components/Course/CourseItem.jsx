// ----------------------------------------------------------------------------------
// FILE: src/components/Course/CourseItem.jsx
// ----------------------------------------------------------------------------------
import React from 'react';
import CourseActions from './CourseActions'; // Assuming it's in the same folder

function CourseItem({ course, statusType, onEnroll, onDisenroll, onMarkFinished }) {
    const courseName = (course && typeof course.name === 'string') ? course.name : 'Unnamed Course';
    const courseDescription = (course && typeof course.description === 'string') ? course.description : 'No description available.';
    return (
        <li>
            <h3>{courseName}</h3>
            <p>{courseDescription}</p>
            <CourseActions
                courseId={course.course_id}
                statusType={statusType}
                onEnroll={onEnroll}
                onDisenroll={onDisenroll}
                onMarkFinished={onMarkFinished}
            />
        </li>
    );
}
export default CourseItem;
