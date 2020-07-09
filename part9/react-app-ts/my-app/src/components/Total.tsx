
import React from 'react';

interface coursePart {
  name: string;
  exerciseCount: number;
}

type Props = {
  courseParts: coursePart[];
};

const Total = ({ courseParts }: Props) => {
  return(
    <p>
    Number of exercises{' '}
    {Object.values(courseParts).reduce((acc, val) => acc + val.exerciseCount, 0)}
    </p>
  );
};

export default Total;