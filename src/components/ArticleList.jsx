import React from "react";
import { useParams } from "react-router-dom";
import SortBy from "./SortBy";
import Loader from "./Loader";
import ArticleCard from "./ArticleCard"; 
import useArticles from "../hooks/useArticles";

import { IconButton, Tooltip } from "@mui/material";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";

const ArticleList = () => {
  const { topic } = useParams();
  const {
    articles,
    sortValue,
    setSortValue,
    orderValue,
    toggleOrder,
    isFirstLoad,
    error,
  } = useArticles(topic);

  // Tooltip messages: when orderValue is DESC, Author shows [A-Z]
  const tooltipMessages = {
    created_at: {
      ASC: "sorting by oldest first",
      DESC: "sorting by newest first",
    },
    author: {
      ASC: "sorting alphabetical [Z-A]",
      DESC: "sorting alphabetical [A-Z]",
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

  if (isFirstLoad) return <Loader />;

  return (
    <div className="articles">
      <h2 id="capitalize">
        {topic === undefined ? "All articles" : `${topic} articles`}
      </h2>

      <div className="sort_by">
        <SortBy sortValue={sortValue} setSortValue={setSortValue} />

        <Tooltip
          title={tooltipMessages[sortValue]?.[orderValue] || "Change order"}
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
            arrow: { sx: { color: "cornflowerblue" } },
          }}
        >
          <IconButton onClick={toggleOrder} color="primary" aria-label="toggle sort order">
            {orderValue === "DESC" ? (
              <ArrowDownwardTwoToneIcon />
            ) : (
              <ArrowUpwardTwoToneIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>

      {error && <p className="error_message">{error}</p>}

      <ul className="articleList">
        {articles.length === 0 && !error ? (
          <p>No articles found for this category.</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ArticleList;