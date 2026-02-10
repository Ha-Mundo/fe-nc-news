import React from "react";
import { useParams, Link } from "react-router-dom";
import SortBy from "./SortBy";
import Loader from "./Loader";
import useArticles from "../hooks/useArticles";

import { IconButton, Tooltip } from "@mui/material";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleList = () => {
  const { topic } = useParams();
  const {
    articles,
    sortValue,
    setSortValue,
    orderValue,
    toggleOrder,
    isInitialLoading,
  } = useArticles(topic);

  const tooltipMessages = {
    created_at: {
      ASC: "sorting by oldest first",
      DESC: "sorting by newest first",
    },
    author: {
      ASC: "sorting alphabetical [A-Z]",
      DESC: "sorting alphabetical [Z-A]",
    },
    votes: {
      ASC: "sorting by lowest popularity",
      DESC: "sorting by highest popularity",
    },
    comment_count: {
      ASC: "sorting by least comments",
      DESC: "sorting by most comments",
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isInitialLoading) return <Loader />;

  return (
    <div className="articles">
      <h2 id="capitalize">
        {topic === undefined ? "All articles" : `${topic} articles`}
      </h2>

      <div className="sort_by">
        <SortBy sortValue={sortValue} setSortValue={setSortValue} />

        <Tooltip
          title={tooltipMessages[sortValue]?.[orderValue] || "Toggle order"}
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: "0.7rem",
                fontWeight: "bold",
                backgroundColor: "cornflowerblue",
              },
            },
            arrow: {
              sx: { color: "cornflowerblue" },
            },
          }}
        >
          <IconButton
            onClick={toggleOrder}
            color="primary"
            aria-label="toggle sort order"
          >
            {orderValue === "DESC" ? (
              <ArrowDownwardTwoToneIcon />
            ) : (
              <ArrowUpwardTwoToneIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>

      <ul className="articleList">
        {articles.map((article) => (
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
            className="articleCard"
          >
            <h4 className="articleTopic">{article.topic}</h4>
            <h3 className="articleTitle">{article.title}</h3>

            <div className="articleDetails">
              <h5>Author: {article.author}</h5>
              <h6>Date: {formatDate(article.created_at)}</h6>
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
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
