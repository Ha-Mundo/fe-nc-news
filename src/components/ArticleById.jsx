import { getArticleById, updateVote } from "../api";
import ArticleComments from "./ArticleComments";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IconButton } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [voteCounter, setVoteCounter] = useState();

  const [disable, setDisable] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then(res => {
      setArticle(res);
      setVoteCounter(res.votes);
    });
  }, [article_id]);

  console.log(article);
  const handleVote = () => {
    if (disable === false) {
      updateVote(article_id, 1).catch(err => {
        setHasError(true);
        setVoteCounter(0);
      });
      setVoteCounter(currVoteCounter => currVoteCounter + 1);
      setDisable(true);
      console.log(disable);
    }
    if (disable === true) {
      updateVote(article_id, -1).catch(err => {
        setHasError(true);
        setVoteCounter(0);
      });

      setVoteCounter(currVoteCounter => currVoteCounter - 1);
      setDisable(false);
    }
  };

  if (article === {}) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="singleArticle">
        <div className="centerArticle">
          <h2>{article.title}</h2>
          <h5>{article.author}</h5>
        </div>
        <div className="articleCard">
          <p>{article.body}</p>
          {hasError && <p className="error">Oh no! Something's gone wrong!</p>}
          <div className="flex-row">
            <IconButton onClick={handleVote}>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color={disable ? "grey" : "primary"}
              />{" "}
              {/*  {article.votes} */}
            </IconButton>
            <p>{voteCounter}</p>
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
        <ArticleComments />
      </div>
    </div>
  );
};

export default ArticleById;
