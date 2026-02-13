import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../utils/Context";
import { getComments, deleteComment } from "../utils/Api";
import AddComment from "./AddComment";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ArticleComments = ({ setCommentCount }) => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((res) => {
        setComments(res);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [article_id]);

  const onDelete = (comment_id) => {
    const previousComments = [...comments];

    // Optimistic UI: remove comment and decrement parent counter immediately
    setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
    setCommentCount((curr) => curr - 1);
    toast.success("Comment deleted");

    deleteComment(comment_id).catch(() => {
      // Rollback: restore state if server fails
      setComments(previousComments);
      setCommentCount((curr) => curr + 1);
      toast.error("Delete failed. Restoring...");
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="articleComments">
      <AddComment setComments={setComments} setCommentCount={setCommentCount} />
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="commentList">
          {comments.map((comment) => (
            <li key={comment.comment_id} className="commentCard">
              <div className="comment-meta">
                <strong>{comment.author}</strong>
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              <p>{comment.body}</p>
              {user?.username === comment.author && (
                <button type="button" className="deleteBtn" onClick={() => onDelete(comment.comment_id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleComments;