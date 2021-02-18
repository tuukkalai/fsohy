import React from 'react';

interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: Array<CourseParts>;
}

const Content: React.FC<Props> = ({ courseParts }) => {
  return(
    <table>
      <tbody>
        {courseParts.map((course: CourseParts) => (
          <tr key={course.name}><td>{course.name}</td><td>{course.exerciseCount}</td></tr>
        ))}
      </tbody>
    </table>
 );
}

export default Content;