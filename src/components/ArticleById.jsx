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

  // State to store the article data
  const [article, setArticle] = useState(null);
  // State to track vote count
  const [voteCounter, setVoteCounter] = useState(0);
  // State to track if the user has already voted
  const [disable, setDisable] = useState(false);
  // State to track if an API error occurred
  const [hasError, setHasError] = useState(false);

  // Fetch article by ID when component mounts or article_id changes
  useEffect(() => {
    getArticleById(article_id)
      .then(res => {
        setArticle(res);
        setVoteCounter(res.votes || 0); // Initialize vote counter safely
      })
      .catch(() => setHasError(true));
  }, [article_id]);

  // Handle upvote/downvote with optimistic UI update
  const handleVote = () => {
    const voteChange = disable ? -1 : 1; // Determine vote change

    // Optimistically update vote count and toggle button state
    setVoteCounter(curr => curr + voteChange);
    setDisable(prev => !prev);

    // Optimistic update: we immediately update the vote count on the UI
    // as if the API call succeeded, for a faster user experience.
    // If the API call fails, we rollback the vote count to its previous value
    // and set an error flag to inform the user.
    updateVote(article_id, voteChange).catch(() => {
      setHasError(true);
      setVoteCounter(curr => curr - voteChange); // Rollback vote if API fails
    });
  };

  // Show loading state if article has not been fetched yet
  if (!article) {
    return <>
          <Loader/>
        </>
  }

  return (
    <div>
      <div className="singleArticle">
        <div className="centerArticle">
          <h2>{article?.title}</h2>
          <h4>{article?.author}</h4>
        </div>
        <div className="articleCard">
          <p>{article?.body}</p>
          {hasError && <p className="error">Oh no! Something's gone wrong!</p>}
          <div className="flex-row">
            {/* Upvote button */}
            <IconButton onClick={handleVote}>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color={disable ? "disabled" : "primary"}
              />
            </IconButton>
            <p>{voteCounter}</p>

            {/* Comment button */}
            <IconButton>
              <CommentTwoToneIcon
                fontSize="large"
                className="icon"
                color="primary"
              />
            </IconButton>
            <p>{article?.comment_count}</p>
          </div>
        </div>

        {/* Comments Section */}
        <ArticleComments />
      </div>
    </div>
  );
};

export default ArticleById;
