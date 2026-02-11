import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { postComment } from "../utils/Api";
import { UserContext } from "../utils/Context";
import toast from "react-hot-toast";

const AddComment = ({ setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleComment = (event) => {
    event.preventDefault();
    
    // Prevent empty comments
    if (!commentBody.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Posting...");

    postComment(article_id, { username: user.username, body: commentBody })
      .then((res) => {
        /* Using functional update (prev) to ensure we have the latest state.
           We add the new comment (res[0]) to the top of the list.
        */
        setComments((prevComments) => [res[0], ...prevComments]);
        setCommentBody(""); // Clear the textarea
        toast.success("Comment added!", { id: loadingToast });
      })
      .catch((err) => {
        console.error("Post error:", err);
        toast.error("Could not post comment. Try again.", { id: loadingToast });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-comment-section">
      {user?.username ? (
        <form onSubmit={handleComment} className="comment_form">
          <textarea
            required
            disabled={isSubmitting}
            onChange={(e) => setCommentBody(e.target.value)}
            name="body"
            value={commentBody}
            placeholder="Write a comment..."
            className="post_comment"
          />
          <button 
            type="submit" 
            className="submit_comment" 
            disabled={isSubmitting || !commentBody.trim()}
          >
            {isSubmitting ? "Sending..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="login-warning">Log in to join the conversation.</p>
      )}
    </div>
  );
};

export default AddComment;