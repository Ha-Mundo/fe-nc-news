import { getArticles } from "../utils/Api";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import SortBy from "./SortBy";

import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortValue, setSortValue] = useState("created_at");
  const [orderValue, setOrderValue] = useState();
  const { topic } = useParams();

  function handleOrder() {
    return setOrderValue(currentOrder => {
      if (currentOrder === "ASC") {
        return "DESC";
      } else {
        return "ASC";
      }
    });
  }

  useEffect(() => {
    getArticles(topic, sortValue, orderValue).then(res => {
      setArticles(res);
    });
  }, [topic, sortValue, orderValue]);

  if (articles === []) {
    return <p className="loader">Loading...</p>;
  }

  return (
    <div className="articles">
      <h2>Articles</h2>
      <div className="flex-row">
        <SortBy sortValue={sortValue} setSortValue={setSortValue} />
        <button id="sort" onClick={handleOrder}>
          Sort by date
        </button>
      </div>
      <ul className="articleList">
        {articles.map(article => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
              className="articleCard"
            >
              <h4 className="articleTopic"> {article.topic} </h4>
              <h3 className="articleTitle"> {article.title}</h3>
              <div className="articleDetails">
                <h5>Author: {article.author}</h5>
                <h6>Date: {article.created_at.split("T")[0]} </h6>
              </div>

              <div className="article_card_footer">
                <p>
                  <ThumbUpTwoToneIcon
                    fontSize="large"
                    className="icon"
                    color="primary"
                  />{" "}
                  {article.votes}
                </p>
                <p>
                  <CommentTwoToneIcon
                    fontSize="large"
                    className="icon"
                    color="primary"
                  />{" "}
                  {article.comment_count}
                </p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
