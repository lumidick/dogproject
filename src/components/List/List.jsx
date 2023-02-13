import './style.css';

export default function List({ isDone }) {
  const data = ['first task', 'second task', 'third task', '4 task', '5 task'];
  const ulTitle = <li>IS DONE</li>;

  return (
    <>
      {isDone ? ulTitle : null}
      <label htmlFor=""></label>
      <ul className="ul-list">
        {data.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </>
  );
}
