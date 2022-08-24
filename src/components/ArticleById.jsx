import { getArticleById, updateVote } from "../api";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IconButton } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then(res => {
      setArticle(res);
    });
  }, [article_id]);

  const handleVote = () => {
    if (disable === false) {
      updateVote(article_id, 1).catch(() =>
        alert("Error can not update votes")
      );
      article.votes += 1;
      setDisable(true);
      console.log(disable);
    }
    if (disable === true) {
      updateVote(article_id, -1).catch(() =>
        alert("Error can not update votes")
      );
      article.votes -= 1;
      setDisable(false);
    }
  };

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
            <IconButton onClick={handleVote}>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color={disable ? "grey" : "primary"}
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
