import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../utils/Context";
import { getComments, deleteComment } from "../utils/Api";
import AddComment from "./AddComment";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ArticleComments = () => {
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
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const onDelete = (comment_id) => {
    // 1. Keep a backup of current comments for potential rollback
    const previousComments = [...comments];

    // 2. Optimistic Update: Remove from UI immediately
    setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
    toast.success("Comment removed");

    // 3. Perform actual delete on server
    deleteComment(comment_id).catch((err) => {
      console.error("Delete error:", err);
      // 4. Rollback: If server fails, restore the previous state
      setComments(previousComments);
      toast.error("Failed to delete. Restoring comment...");
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="articleComments">
      <AddComment setComments={setComments} />
      
      <h3>Comments ({comments.length})</h3>
      
      {comments.length === 0 ? (
        <p className="empty-msg">No comments yet.</p>
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
                <button
                  type="button"
                  className="deleteBtn"
                  onClick={() => onDelete(comment.comment_id)}
                >
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