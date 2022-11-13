import { useEffect, useState } from "react";
import "./App.css";
import NewsContent from "./components/NewsContent";

import SearchInput from "./components/SearchInput";

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchParameter, setSearchParameter] = useState("");
  const [search, setSearch] = useState("Apple");
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    try {
      const fetchApi = async () => {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${search}&apiKey=45ce90ee48604930a387913b61787863`
        );
        const data = await res.json();

        setApiData([
          ...apiData,
          ...data.articles.slice(0 + counter, 6 + counter),
        ]);
      }
      fetchApi();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [search, counter]);

  const fetchMore = () => {
    setCounter(counter + 6);
  };

  const onClickHandler = () => {
    setLoading(true);
    setSearch(searchParameter);
    setCounter(0);
    setApiData([]);
    setSearchParameter("");
  };
  return (
    <>
      <SearchInput
        searchParameter={searchParameter}
        setSearchParameter={setSearchParameter}
        onClickHandler={onClickHandler}
      />

      {loading ? (
        <h1 className="loading">Loading.....</h1>
      ) : (
        <NewsContent apiData={apiData} fetchMore={fetchMore} />
      )}
    </>
  );
}

export default App;
