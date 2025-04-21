import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";



const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
    </div>
  );
};

const List = (props) => (
    <ul>
      {props.list.map((item) => (
          <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
  const Item = (props) => (
    <li>
      <span>
        <a href={props.item.url}> {props.item.title}</a>
      </span>
      <span> Author : {props.item.author}</span>
      <span> | Comments : {props.item.num_comments}</span>
      <span> | Points : {props.item.points}</span>
    </li>
  );

function getTitle(title) {
  return `Title: ${title}`;
}

const App = () => {
  const stories = [
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
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List list={stories} />
      <h2>Titles :</h2>
      <ul>
        {stories.map((item) => (
          <li key={item.objectID}>{getTitle(item.title)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
