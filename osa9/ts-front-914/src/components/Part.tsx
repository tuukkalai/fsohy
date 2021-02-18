import React from "react";
import { CoursePart, assertNever } from "../types";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <tr key={part.name}>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td>{part.description}</td>
        </tr>
      );
    case "Using props to pass data":
      return (
        <tr key={part.name}>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td>{part.groupProjectCount}</td>
        </tr>
      );
    case "Deeper type usage":
      return (
        <tr key={part.name}>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td>{part.description}</td>
          <td>{part.exerciseSubmissionLink}</td>
        </tr>
      );
    case "How to exit Vim":
      return (
        <tr key={part.name}>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td>{part.description}</td>
          <td>{part.exerciseSubmissionLink}</td>
          <td>{part.timesGoogledCount}</td>
        </tr>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
