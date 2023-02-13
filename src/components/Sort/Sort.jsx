import React from 'react';
import s from './style.module.css';
import cn from 'classnames';

const Sort = ({ currentSort, tabs, onChangeSort }) => {
  return (
    <div className={s.sort}>
      {tabs.map((tab) => (
        <div onClick={() => onChangeSort(tab.id)} key={tab.id} className={cn(s.tab, { [s.selected]: currentSort === tab.id })}>
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default Sort;
