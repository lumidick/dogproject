import React, { useContext } from 'react';
import { Spin } from 'antd';
import s from './style.module.css';
import Card from '../../components/Card/Card';
import { LoadingContext } from '../../context/loadingContext';
import { ThemeContext } from '../../context/themeContext';

const CardList = ({ cards }) => {
  const { isLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  return <div className={s.cards}>{isLoading ? <Spin></Spin> : cards.map((card) => <Card style={{ backgroundColor: theme.backgroundColor, color: theme.color }} key={card._id} {...card} />)}</div>;
};

export default CardList;
