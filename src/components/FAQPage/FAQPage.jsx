import React from 'react';
import Accordion from '../Accordion/Accordion';

const data = [
  {
    title: 'TITLE',
    text: 'text text text text text text text text text text text text text text text text text text text text text text text text',
  },
  {
    title: 'TITLE',
    text: 'text text text text text text text text text text text text text text text text text text text text text text text text',
  },
  {
    title: 'TITLE',
    text: 'text text text text text text text text text text text text text text text text text text text text text text text text',
  },
  {
    title: 'TITLE',
    text: 'text text text text text text text text text text text text text text text text text text text text text text text text',
  },
];

const FAQPage = () => {
  return (
    <div>
      {data.map((el) => (
        <Accordion {...el} />
      ))}
    </div>
  );
};

export default FAQPage;
