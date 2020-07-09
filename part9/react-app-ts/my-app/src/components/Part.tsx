import React from 'react';
import { CoursePart } from '../index'

type Props = {
  part: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ part }: Props) => {
  switch (part.name) {
    case 'My interface':
    case 'Fundamentals':
      return <p>{part.name} {part.description} {part.exerciseCount}</p>
    case 'Using props to pass data' :
      return <p>{part.name} {part.groupProjectCount} {part.exerciseCount}</p>
    case 'Deeper type usage' :
      return <p>{part.name} {part.description} {part.exerciseSubmissionLink} {part.exerciseCount}</p>
    default:
      return assertNever(part);
  };
};

export default Content;