import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/Context";
import { updateCommentVote } from "../utils/Api";
import { IconButton } from "@mui/material";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import toast from "react-hot-toast";

const CommentCard = ({ comment, onDelete }) => {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(comment.votes);
  const [voted, setVoted] = useState(false);
  const storageKey = `voted_comments_${user?.username}`;

  // Check if this specific comment was already voted by the user
  useEffect(() => {
    const votedComments = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (votedComments.includes(comment.comment_id)) {
      setVoted(true);
    }
  }, [comment.comment_id, storageKey]);

  const handleVote = () => {
    if (!user?.username) return toast.error("Log in to vote!");

    const voteChange = voted ? -1 : 1;

    // Optimistic UI Update
    setVotes((curr) => curr + voteChange);
    setVoted((prev) => !prev);

    // Update LocalStorage memory
    let votedComments = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (!voted) {
      votedComments.push(comment.comment_id);
    } else {
      votedComments = votedComments.filter((id) => id !== comment.comment_id);
    }
    localStorage.setItem(storageKey, JSON.stringify(votedComments));

    // API call with Rollback
    updateCommentVote(comment.comment_id, voteChange).catch(() => {
      setVotes((curr) => curr - voteChange);
      setVoted((prev) => !prev);
      toast.error("Vote failed. Try again.");
    });
  };

  return (
    <li className="commentCard">
      <div className="comment-meta">
        <strong>{comment.author}</strong>
        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
      </div>
      <p>{comment.body}</p>

      <div className="comment-actions">
        <div className="vote-section">
          <IconButton onClick={handleVote} size="small">
            <ThumbUpTwoToneIcon 
              fontSize="small" 
              color={voted ? "secondary" : "action"} 
            />
          </IconButton>
          <span>{votes}</span>
        </div>

        {user?.username === comment.author && (
          <button className="deleteBtn" onClick={() => onDelete(comment.comment_id)}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default CommentCard;