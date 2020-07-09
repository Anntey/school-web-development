import React from 'react';
import { CoursePart } from '../index'
import Part from './Part'

type Props = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: Props) => {
  return(
    <div>
      {Object.values(courseParts).map((p, i) =>
        <Part key={i} part={p} />
      )}
    </div>
  );
};

export default Content;