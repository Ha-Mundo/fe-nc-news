import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { postComment } from "../utils/Api";
import { UserContext } from "../utils/Context";
import toast from "react-hot-toast";

const AddComment = ({ setComments, setCommentCount }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleComment = (event) => {
    event.preventDefault();
    if (!commentBody.trim()) return toast.error("Empty comment!");

    setIsSubmitting(true);
    const loadingToast = toast.loading("Posting...");

    postComment(article_id, { username: user.username, body: commentBody })
      .then((res) => {
        // Update local comment list (ArticleComments state)
        setComments((prev) => [res[0], ...prev]);
        
        // Update dynamic counter in the main page (ArticleById state)
        setCommentCount((curr) => curr + 1);
        
        setCommentBody("");
        toast.success("Posted!", { id: loadingToast });
      })
      .catch(() => {
        toast.error("Failed to post.", { id: loadingToast });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="add-comment-section">
      {user?.username ? (
        <form onSubmit={handleComment} className="comment_form">
          <textarea
            required
            disabled={isSubmitting} // Disable during API call
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
            placeholder="Add a comment..."
            className="post_comment"
          />
          <button type="submit" disabled={isSubmitting || !commentBody.trim()}>
            {isSubmitting ? "..." : "Post"}
          </button>
        </form>
      ) : (
        <p>Log in to comment.</p>
      )}
    </div>
  );
};

export default AddComment;