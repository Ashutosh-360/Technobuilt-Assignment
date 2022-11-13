import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function NewsContent(props) {
  const { apiData, fetchMore } = props;
  return (
    <InfiniteScroll
      dataLength={apiData.length}
      next={fetchMore}
      hasMore={true}
      loader={<h1 className="loading">Loading.....</h1>}
    >
      <div className="card-container">
        {apiData.map((news, id) => {
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
                <button className="read-more">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    Read More
                  </a>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
}

export default NewsContent;
