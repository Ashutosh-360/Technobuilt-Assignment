import { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchParameter, setSearchParameter] = useState("");
  const [search, setSearch] = useState("Apple");
  const [loading, setLoading] = useState(true);
  const[counter,setCounter]=useState(0);
  useEffect(()=>{
    try {
      const fetchApi=async()=>{
        await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=45ce90ee48604930a387913b61787863`)
        .then((res)=>res.json())
        .then((data)=>{
          setApiData([...apiData,...data.articles.slice(0+counter,6+counter)])
        });
      }
      fetchApi();
      
      
    } catch (error) {
      console.log(error);
    }
    
    setTimeout(()=>{
      setLoading(false);
    },1000);
        
  },[search,counter])

  const fetchMore = () => {
    setCounter(counter+6);
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
    <div className="input-container">
    <div className="search-div">
      <input
        id="search"
        type="text"
        placeholder="Search News here"
        value={searchParameter}
        onChange={(event) => {
          setSearchParameter(event.target.value);
        }}
      />
      <button className="search-btn" onClick={onClickHandler}>Search</button>
      </div>
</div>

      {loading ? (
        <h1 className="loading">Loading.....</h1>
      ) : (
        <>
        <InfiniteScroll
          dataLength={apiData.length}
          next={fetchMore}
          hasMore={true}
          loader={<h1 className="loading">Loading.....</h1>}
        >
          <div className="card-container">
            {apiData.map((news,id) => {
              return (
                <div className="card" key={id}>
                  <img src={news.urlToImage} alt="" />
                  <div className="info">
                  <h1>{news.title}</h1>
                  <div className="author-date">
                    <span>{news.publishedAt.slice(0, 10)}</span>
                    {news.author ? <span>{news.author}</span> : ""}
                  </div>
                  <p>{news.description.slice(0, 140) + "......"}</p>
                  <button className="read-more"><a href={news.url} target="_blank" rel="noreferrer">
                    Read More
                  </a></button>
                  
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        </>
      )}
    </>
  );
}

export default App;
