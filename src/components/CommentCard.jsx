import React, { useContext } from "react";
import { UserContext } from "../utils/Context";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const CommentCard = ({ comment, onDelete }) => {
  const { user } = useContext(UserContext);

  // Simple formatting for the date
  const formattedDate = new Date(comment.created_at).toLocaleDateString();

  return (
    <li className="commentCard">
      <div className="comment-meta">
        <strong>{comment.author}</strong>
        <span>{formattedDate}</span>
      </div>
      
      <p className="comment-body">{comment.body}</p>

      <div className="comment-footer">
        <div className="comment-votes">
          <ThumbUpIcon fontSize="inherit" color="disabled" />
          <span>{comment.votes}</span>
        </div>

        {/* Delete button only if the user is the author */}
        {user?.username === comment.author && (
          <button 
            className="deleteBtn" 
            onClick={() => onDelete(comment.comment_id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default CommentCard;