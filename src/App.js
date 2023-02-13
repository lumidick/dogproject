import './App.css';
import React, { useState, useEffect } from 'react';
import cardsFromBack from './data.json';
import Header from './components/Header/Header';
import Logo from './components/Logo/Logo';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';

function App() {
  const [cards, setCards] = useState(cardsFromBack);
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = (text) => setSearchQuery(text);
  const handleRequest = () => {
    setCards((cards) => cardsFromBack.filter((card) => card.name.toLowerCase().startsWith(searchQuery)));
  };

  useEffect(() => {
    handleRequest();
  }, [searchQuery]);

  const style = { backgroundColor: 'red', height: '150px', width: '150px' };

  return (
    <>
      <Header>
        <>
          <Logo />
          <Search onChange={onChange} onButtonSearchClick={handleRequest} />
        </>
      </Header>
      <button style={style}></button>
      <CardList cards={cards}></CardList>
    </>
  );
}

export default App;
