import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface Props {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<Props> = ({ courseParts }) => ( 
  <table>
    <tbody>
      {courseParts.map(course => (
        <Part key={course.name} part={course} />
      ))}
    </tbody>
  </table>
)

export default Content;