import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

export interface Base {
  name: string;
  exerciseCount: number;
}

export interface Desc extends Base {
  description: string;
}

export interface One extends Desc {
  name: 'Fundamentals';
}

export interface Two extends Base {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface Three extends Desc {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

export interface My {
  name: 'My interface';
  exerciseCount: number;
  description: string;
}

export type CoursePart = One | Two | Three | My;

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    {
      name: 'My interface',
      exerciseCount: 2,
      description: 'Liiba laaba'
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);