import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../utils/Api";
import SortBy from "./SortBy";
import Loader from "./Loader";

import { IconButton, Tooltip } from "@mui/material";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortValue, setSortValue] = useState("created_at");
  const [orderValue, setOrderValue] = useState("DESC");
  const { topic } = useParams();

  // Tooltip Message Mapping
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

  const handleOrder = () => {
    setOrderValue((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  useEffect(() => {
    getArticles(topic, sortValue, orderValue).then((res) => {
      setArticles(res);
    });
  }, [topic, sortValue, orderValue]);

  if (articles.length === 0) {
    return <Loader />;
  }

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
                fontSize: "0.9rem",
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
            onClick={handleOrder}
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
              <h6>Date: {article.created_at.split("T")[0]}</h6>
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