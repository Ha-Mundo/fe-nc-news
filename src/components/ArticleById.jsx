import { getArticleById, updateVote } from "../utils/Api";
import ArticleComments from "./ArticleComments";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import Loader from "./Loader";

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [voteCounter, setVoteCounter] = useState(0);
  
  // State to sync comment count with AddComment/ArticleComments actions
  const [commentCount, setCommentCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then(res => {
        setArticle(res);
        setVoteCounter(res.votes || 0);
        // Initialize dynamic counter from API response
        setCommentCount(parseInt(res.comment_count) || 0);
      })
      .catch(() => setHasError(true));
  }, [article_id]);

  const handleVote = () => {
    const voteChange = disable ? -1 : 1;
    
    // Optimistic Update: change UI immediately
    setVoteCounter(curr => curr + voteChange);
    setDisable(prev => !prev);

    updateVote(article_id, voteChange).catch(() => {
      setHasError(true);
      // Rollback: revert UI if API fails
      setVoteCounter(curr => curr - voteChange);
      setDisable(prev => !prev);
    });
  };

  if (!article) return <Loader/>;

  return (
    <div>
      <div className="singleArticle">
        <div className="centerArticle">
          <h2>{article?.title}</h2>
          <h4>{article?.author}</h4>
        </div>
        <div className="articleCard">
          <p>{article?.body}</p>
          {hasError && <p className="error">Something went wrong!</p>}
          <div className="flex-row">
            <IconButton onClick={handleVote}>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color={disable ? "disabled" : "primary"}
              />
            </IconButton>
            <p>{voteCounter}</p>

            <IconButton>
              <CommentTwoToneIcon fontSize="large" className="icon" color="primary" />
            </IconButton>
            {/* Displaying the dynamic state instead of the static article object */}
            <p>{commentCount}</p>
          </div>
        </div>
        {/* Lifting State: passing the setter to children to sync comment count */}
        <ArticleComments setCommentCount={setCommentCount} />
      </div>
    </div>
  );
};

export default ArticleById;