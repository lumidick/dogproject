import React, { useState, useEffect } from 'react';

import { Button, Layout, Row, Col, Typography, Slider, Input } from 'antd';
import Table from './Table';
import { pokemonData } from './pokemon.js';
import styled from 'styled-components';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const AppAnt = () => {
  const [rows, setRows] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPockemons, setFilteredPockemons] = useState(pokemonData);
  useEffect(() => {
    const filtred = pokemonData.filter((el) => el.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPockemons(filtred);
  }, [searchQuery]);

  const ButtonStyle = styled.button`
    color: ${(props) => (props.tomato ? 'tomato' : 'blue')};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-color: ${(props) => (props.tomato ? 'tomato' : 'blue')};
    border-radius: 3px;
  `;

  const ButtonAntdStyle = styled(Button)`
    color: red;

    .text {
      color: blue;
    }

    &:hover {
      color: green !important;
    }
  `;

  // const TomatoButton = styled(ButtonStyle)`
  //   color: tomato;
  //   border-color: tomato;
  // `;

  return (
    <Layout>
      <Header>
        <Typography style={{ color: 'white', fontSize: 32 }}>POCKEMONS</Typography>
      </Header>
      <Content>
        <Row>
          <Col xs={24} md={{ span: 16, ofsset: 4 }}>
            <ButtonStyle>CLICK ME</ButtonStyle>
            <ButtonStyle tomato={true}>CLICK ME</ButtonStyle>
            <ButtonStyle as={'a'} tomato={true}>
              CLICK ME
            </ButtonStyle>
            <ButtonAntdStyle>
              CLICK <span class="text"> ME</span>
            </ButtonAntdStyle>
            {/* <TomatoButton>CLICK ME</TomatoButton> */}
            <Slider min={1} max={100} defaultValue={rows} onChange={setRows}></Slider>
            <Search onChange={(e) => setSearchQuery(e.target.value)}></Search>
            <Table data={filteredPockemons} rows={rows}></Table>
          </Col>
        </Row>
      </Content>
      <Footer>FOOTER</Footer>
    </Layout>
  );
};

export default AppAnt;
