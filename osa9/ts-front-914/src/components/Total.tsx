import React from 'react';

interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: Array<CourseParts>;
}

const Total: React.FC<Props> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((c: number, course: CourseParts) => c + course.exerciseCount, 0)}
    </p>
  )
}

export default Total;