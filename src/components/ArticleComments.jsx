import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComments, deleteComment } from "../utils/Api";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ArticleComments = ({ setCommentCount }) => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    
    // Optimistic UI for deletion
    setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
    setCommentCount((curr) => curr - 1);
    toast.success("Comment deleted");

    deleteComment(comment_id).catch(() => {
      // Rollback on server failure
      setComments(previousComments);
      setCommentCount((curr) => curr + 1);
      toast.error("Failed to delete comment.");
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="articleComments">
      <AddComment setComments={setComments} setCommentCount={setCommentCount} />
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet.</p>
      ) : (
        <ul className="commentList">
          {comments.map((comment) => (
            <CommentCard 
              key={comment.comment_id} 
              comment={comment} 
              onDelete={onDelete} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleComments;