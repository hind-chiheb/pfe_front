// ----------------------------------------------------------------------------------
// FILE: src/components/Course/CourseList.jsx
// ----------------------------------------------------------------------------------
import React from 'react';
import CourseItem from './CourseItem'; // Assuming it's in the same folder

function CourseList({ title, courses, statusType, onEnroll, onDisenroll, onMarkFinished, isLoading }) {
    let emptyMessage = 'No courses found.';
    if (statusType === 'enrolled') emptyMessage = 'No courses currently enrolled.';
    else if (statusType === 'available') emptyMessage = 'No courses available for enrollment.';
    else if (statusType === 'finished') emptyMessage = 'No courses finished yet.';

    return (
        <section className="course-section" id={`${statusType}-courses`}>
            <h2>{title}</h2>
            <ul id={`${statusType}-courses-list`}>
                {isLoading && <li>Loading {statusType} courses...</li>}
                {!isLoading && courses && courses.length > 0 ? (
                    courses.map(course => (
                        <CourseItem
                            key={course.course_id}
                            course={course}
                            statusType={statusType}
                            onEnroll={onEnroll}
                            onDisenroll={onDisenroll}
                            onMarkFinished={onMarkFinished}
                        />
                    ))
                ) : (!isLoading && <li>{emptyMessage}</li>)}
            </ul>
        </section>
    );
}
export default CourseList;
