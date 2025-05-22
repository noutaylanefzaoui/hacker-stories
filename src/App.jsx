import React from "react"; // Import React
import reactLogo from "./assets/react.svg"; // Tell Webpack to load this file
import viteLogo from "/vite.svg";
import "./App.css";
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setStories(result.hits);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]);

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
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories} onRemoveItem={handleRemoveStory} />
      )}
      <List list={stories} onRemoveItem={handleRemoveStory} />
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
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