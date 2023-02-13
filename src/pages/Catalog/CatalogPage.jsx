import React, { useContext } from 'react';
import { Spin } from 'antd';
import { useMatch } from 'react-router-dom';

import CardList from '../../components/CardList/CardList';
import NotFound from '../../components/NotFound/NotFound';
import PageHeader from '../../components/PageHeader/PageHeader';
import Sort from '../../components/Sort/Sort';
import { LoadingContext } from '../../context/loadingContext';

const tabs = [
  {
    id: 'cheap',
    title: 'Сначала дешевые',
  },
  {
    id: 'low',
    title: 'Сначала дорогие',
  },
  {
    id: 'sale',
    title: 'По скидке',
  },
  {
    id: 'default',
    title: 'Без сортировки',
  },
];

const CatalogPage = ({ cards, searchQuery, onChangeSort, currentSort }) => {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      {/* {!useMatch('/') && <PageHeader title={'Каталог'} buttonText="На главную" link={'/'}></PageHeader>} */}
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <>
          {searchQuery?.length > 0 && cards?.length > 0 && (
            <h2>
              По запросу {searchQuery} найдено {cards?.length} товаров
            </h2>
          )}
          {cards?.length > 0 && <Sort currentSort={currentSort} onChangeSort={onChangeSort} tabs={tabs}></Sort>}
          <div>
            {cards?.length === 0 ? <NotFound title={'По данному запросу ничего не найдено'} buttonText={'Перейти в каталог'} link={'/catalog'}></NotFound> : <CardList cards={cards}></CardList>}
          </div>
        </>
      )}
    </>
  );
};

export default CatalogPage;
