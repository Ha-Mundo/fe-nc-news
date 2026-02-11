import React from "react";
import { Link } from "react-router-dom";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

/**
 * Pure component to render a single article card.
 * Logic for date formatting is kept internal for encapsulation.
 */
const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Link to={`/articles/${article.article_id}`} className="articleCard">
      <h4 className="articleTopic">{article.topic}</h4>
      <h3 className="articleTitle">{article.title}</h3>

      <div className="articleDetails">
        <h5>Author: {article.author}</h5>
        <h6>Date: {formatDate(article.created_at)}</h6>
      </div>

      <div className="article_card_footer">
        <p>
          <ThumbUpTwoToneIcon fontSize="large" className="icon" color="primary" />{" "}
          {article.votes}
        </p>
        <p>
          <CommentTwoToneIcon fontSize="large" className="icon" color="primary" />{" "}
          {article.comment_count}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;