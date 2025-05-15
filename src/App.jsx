import React from "react"; // Import React
import reactLogo from "./assets/react.svg"; // Tell Webpack to load this file
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const initialStories = [
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
    },
  ];
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") || "React"
  );
  const [stories, setStories] = React.useState(initialStories);
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemove={handleRemoveStory} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  label,
  value,
  onInputChange,
  type = "text",
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input type={type} id={id} value={value} onChange={onInputChange} />
  </>
);

const List = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>
      <a href={item.url}> {item.title}</a>
    </span>
    <span> Author: {item.author}</span>
    <span> | Comments: {item.num_comments}</span>
    <span> | Points: {item.points}</span>
    <span>
      <button type="button" onClick={() => onRemove(item)}>
        Remove
      </button>
    </span>
  </li>
);

function getTitle(title) {
  // function to format the title of an item
  return `Title: ${title}`; // return a formatted string with the title
}

export default App;