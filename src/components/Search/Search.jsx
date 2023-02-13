import React, { useState } from 'react';
import { ReactComponent as Icon } from '../../assets/image/ic-search.svg';
import { ReactComponent as IconClose } from '../../assets/image/ic-close-input.svg';
import s from './style.module.css';

function Search({ onSearch }) {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={onSubmit} className={s.search}>
      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
        className={s.input}
        placeholder="Поиск"
        value={text}
      />
      <Icon className={s.icon} onClick={() => onSearch(text)} />
      <IconClose
        className={s.iconCross}
        onClick={() => {
          setText('');
          onSearch('');
        }}
      />
    </form>
  );
}

export default Search;
