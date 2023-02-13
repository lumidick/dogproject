import { Table as TableAnt, Image, Typography } from 'antd';
import { pokemonData } from './pokemon.js';

const { Paragraph } = Typography;

const Table = ({ rows, data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Paragraph copyable>{text}</Paragraph>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Image src={src} width={150}></Image>,
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
      filters: [
        {
          text: 'Seed Pokémon',
          value: 'Seed Pokémon',
        },
        {
          text: 'Lizard Pokémon',
          value: 'Lizard Pokémon',
        },
        {
          text: 'Flame Pokémon',
          value: 'Flame Pokémon',
        },
      ],
      onFilter: (value, record) => record.classification.includes(value),
    },
    {
      title: 'Max HP',
      dataIndex: 'maxHP',
      key: 'maxHP',
      sorter: (a, b) => a.maxHP - b.maxHP,
    },
    {
      title: 'Max CP',
      dataIndex: 'maxCP',
      key: 'maxCP',
    },
  ];
  const pokemons = data.map((el) => {
    return { ...el, key: el.id };
  });
  return (
    <TableAnt
      columns={columns}
      dataSource={pokemons}
      pagination={{
        pageSizeOptions: [20, 30, 40],
        showSizeChanger: false,
        pageSize: rows,
      }}
    ></TableAnt>
  );
};

export default Table;
