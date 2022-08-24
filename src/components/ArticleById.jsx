import { getArticleById } from "../api";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import { IconButton } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticleById(article_id).then(res => {
      setArticle(res);
    });
  }, [article_id]);

  return (
    <div>
      <div className="SingleArticle">
        <div className="centerArticle">
          <h2>{article.title}</h2>
          <h5>{article.author}</h5>
        </div>
        <div className="articleCard">
          <p>{article.body}</p>
          <div className="flex-row">
            <IconButton>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color="primary"
              />{" "}
              {/*  {article.votes} */}
            </IconButton>
            <p>{article.votes}</p>
            <IconButton>
              <CommentTwoToneIcon
                fontSize="large"
                className="icon"
                color="primary"
              />{" "}
            </IconButton>
            <p>{article.comment_count} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleById;
