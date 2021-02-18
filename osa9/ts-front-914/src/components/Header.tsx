import React from 'react';

type CourseProps = {
  courseName: string;
}

const Header: React.FC<CourseProps> = ({ courseName }) => {
  return(
    <h1>{courseName}</h1>
  )
};

export default Header;