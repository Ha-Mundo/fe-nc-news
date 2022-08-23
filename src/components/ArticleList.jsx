import { getArticles } from "../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then(res => {
      setArticles(res);
    });
  }, [topic]);

  return (
    <div className="articles">
      <h2>Articles</h2>
      <ul className="articleList">
        {articles.map(article => {
          return (
            <div key={article.article_id} className="articleCard">
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
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
