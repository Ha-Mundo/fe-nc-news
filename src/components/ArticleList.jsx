import { getArticles } from "../api";
import React, { useState, useEffect } from "react";

import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(res => {
      setArticles(res);
    });
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>
      <ul className="articleList">
        {articles.map(article => {
          return (
            <div key={article.article_id} className="articleCard">
              <h4 className="articleTopic"> {article.topic} </h4>
              <h3 className="articleTitle"> {article.title}</h3>

              <h5>Author: {article.author}</h5>
              <h6>Date: {article.created_at.split("T")[0]} </h6>

              <div className="article_card_footer">
                <p>
                  <ThumbUpIcon className="icon" color="primary" />{" "}
                  {article.votes}
                </p>
                <p>
                  <CommentIcon className="icon" color="primary" />{" "}
                  {article.comment_count}
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
