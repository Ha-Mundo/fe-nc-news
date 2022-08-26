import { postComment } from "../utils/Api";
import React, { useState, useContext } from "react";
import { useParams } from "react-router";

import { UserContext } from "../utils/Context";

const AddComment = ({ comments, setComments }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleComment = event => {
    event.preventDefault();

    const commentBox = document.getElementById("comment-box");
    commentBox.disabled = true;
    commentBox.classList.toggle("hidden");

    const button = document.getElementById("button");
    button.disabled = true;
    button.classList.toggle("hidden");

    const successMsg = document.getElementById("success");
    successMsg.classList.toggle("hidden");

    postComment(article_id, { username: user.username, body: comment })
      .then(res => {
        const newComments = comments.map(comment => {
          return comment;
        });
        newComments.push(res[0]);
        setComments(newComments);
        setComment("");
      })
      .catch(err => {
        alert("Impossible to post... try again!");
      });
  };

  return (
    <div>
      {user.username ? (
        <form onSubmit={handleComment} className="comment_form">
          <textarea
            required
            id="comment-box"
            type="text"
            onChange={handleChange}
            name="body"
            value={comment}
            placeholder="What do you think?"
            className="post_comment"
          ></textarea>
          <button id="button" type="submit" className="submit_comment">
            Post a comment
          </button>
        </form>
      ) : (
        <p>Please login to leave a comment</p>
      )}
      <p id="success" className="hidden">
        You successfully posted a comment!
      </p>
    </div>
  );
};

export default AddComment;
