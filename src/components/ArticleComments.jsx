import { getComments } from "../api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArticleComments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id).then(res => {
      setComments(res);
    });
  }, [article_id]);

  return (
    <div className="articleComments">
      <h3>Article Comments</h3>
      <ul className="commentList">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id} className="commentCard">
              <h4 className="commentAuthor">{comment.author}</h4>
              <h6>{comment.created_at.split("T")[0]}</h6>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleComments;
