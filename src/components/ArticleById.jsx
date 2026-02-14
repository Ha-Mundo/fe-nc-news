import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../utils/Context"; // Import Context to know who is voting
import { getArticleById, updateVote } from "../utils/Api";
import ArticleComments from "./ArticleComments";
import { IconButton } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import Loader from "./Loader";

const ArticleById = () => {
  const { article_id } = useParams();
  const { user } = useContext(UserContext); // Get logged-in user

  const [article, setArticle] = useState(null);
  const [voteCounter, setVoteCounter] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Key for localStorage specific to the current user
  const storageKey = `voted_articles_${user?.username}`;

  useEffect(() => {
    // 1. Fetch article data
    getArticleById(article_id)
      .then(res => {
        setArticle(res);
        setVoteCounter(res.votes || 0);
        setCommentCount(parseInt(res.comment_count) || 0);

        // 2. Check localStorage to see if this specific article was already voted by the user
        const votedArticles = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (votedArticles.includes(article_id)) {
          setDisable(true); // Persist the "voted" state across navigation
        }
      })
      .catch(() => setHasError(true));
  }, [article_id, storageKey]);

  const handleVote = () => {
    if (!user?.username) return; // Prevent voting if not logged in

    const voteChange = disable ? -1 : 1;
    setVoteCounter(curr => curr + voteChange);
    setDisable(prev => !prev);

    // Update localStorage list of voted articles
    let votedArticles = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (!disable) {
      votedArticles.push(article_id); // Add ID if voting up
    } else {
      votedArticles = votedArticles.filter(id => id !== article_id); // Remove ID if voting down
    }
    localStorage.setItem(storageKey, JSON.stringify(votedArticles));

    // API call with rollback logic
    updateVote(article_id, voteChange).catch(() => {
      setHasError(true);
      setVoteCounter(curr => curr - voteChange);
      setDisable(prev => !prev);
      // Rollback localStorage as well
      localStorage.setItem(storageKey, JSON.stringify(JSON.parse(localStorage.getItem(storageKey)).filter(id => id !== article_id)));
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
          <div className="article_card_footer">
            <IconButton onClick={handleVote} disabled={!user?.username}>
              <ThumbUpTwoToneIcon
                fontSize="large"
                className="icon"
                color={disable ? "disabled" : "primary"} // Visual feedback for voted state
              />
            </IconButton>
            <p>{voteCounter}</p>

            <IconButton>
              <CommentTwoToneIcon fontSize="large" className="icon" color="primary" />
            </IconButton>
            <p>{commentCount}</p>
          </div>
        </div>
        <ArticleComments setCommentCount={setCommentCount} />
      </div>
    </div>
  );
};

export default ArticleById;