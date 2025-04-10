import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov and Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

function Search() {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

function List({ list }) {
  return (
    <ul>
      {list.map(function (item) {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}> {item.title}</a>
            </span>
            <span> Author: {item.author}</span>
            <span> | Comments: {item.num_comments}</span>
            <span> | Points: {item.points}</span>
          </li>
        );
      })}
    </ul>
  );
}

function getTitle(title) {
  return `Title: ${title}`;
}

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List list={list} />
      <h2>Titles :</h2>
      <ul>
        {list.map((item) => (
          <li key={item.objectID}>{getTitle(item.title)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
