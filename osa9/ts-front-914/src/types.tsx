// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsDescBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartsDescBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartsDescBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartsDescBase {
  name: "How to exit Vim";
  exerciseSubmissionLink: string;
  timesGoogledCount: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};