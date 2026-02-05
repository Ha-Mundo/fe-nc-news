import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../utils/Context";
import { getComments, deleteComment } from "../utils/Api";

import AddComment from "./AddComment";
import Loader from "./Loader";

const ArticleComments = () => {
  const { article_id } = useParams();

  // Comments state
  const [comments, setComments] = useState([]);

  // Loading state to distinguish between "fetching" and "empty list"
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    getComments(article_id)
      .then((res) => {
        setComments(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  // Show loader while fetching data
  if (isLoading) return <Loader />;

  // Show message when comments are empty
  if (!isLoading && comments.length === 0) {
    return <p className="loading-txt">No comments yet.</p>;
  }

  // Delete comment handler
  const onDelete = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        const updatedComments = comments.filter(
          (comment) => comment.comment_id !== comment_id
        );
        setComments(updatedComments);

        // Alert after successful delete
        alert("Comment deleted successfully!");
      })
      .catch((err) => {
        console.error(err.response.data);
        alert("Cannot delete from server... try again!");
      });
  };

  return (
    <div className="articleComments">
      <AddComment comments={comments} setComments={setComments} />
      <h3>Article Comments</h3>
      <ul className="commentList">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="commentCard">
              <h4 className="commentAuthor">{comment.author}</h4>
              <h6>{comment.created_at.split("T")[0]}</h6>
              <p>{comment.body}</p>

              {user.username === comment.author ? (
                <button
                  type="button"
                  className="deleteBtn"
                  onClick={() => onDelete(comment.comment_id)}
                >
                  Delete
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleComments;
