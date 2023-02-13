import React, { useState } from 'react';
import s from './style.module.css';
import cn from 'classnames';

const Accordion = ({ title, text }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={s.button} onClick={() => setSelected(!selected)}>
        <p className={s.title}>
          <span>{selected ? '-' : '+'}</span>
          {title}
        </p>
      </button>
      {selected && (
        <div className={s.content}>
          <div className={s.text}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
