import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../utils/Context";
import { getComments, deleteComment } from "../utils/Api";

import AddComment from "./AddComment";
import Loader from "./Loader";

const ArticleComments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getComments(article_id).then(res => {
      setComments(res);
    });
  }, [article_id]);

  const onDelete = comment_id => {
    deleteComment(comment_id)
      .then(res => {
        const newComments = comments.map(comment => {
          return { ...comment };
        });
        const updatedComments = newComments.filter(comment => {
          return comment.comment_id !== comment_id;
        });
        setComments(updatedComments);
      })
      .catch(err => {
        console.log(err.response.data);
        alert("Cannot delete to server...try again!");
      });
  };

  if (comments.length === 0) {
    return <Loader />;
  }

  return (
    <div className="articleComments">
      <AddComment comments={comments} setComments={setComments} />
      <h3>Article Comments</h3>
      <ul className="commentList">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id} className="commentCard">
              <h4 className="commentAuthor">{comment.author}</h4>
              <h6>{comment.created_at.split("T")[0]}</h6>
              <p>{comment.body}</p>

              {user.username === comment.author ? (
                <button
                  type="button"
                  className="deleteBtn"
                  onClick={() => {
                    onDelete(comment.comment_id);
                    alert("Comment Deleted!");
                  }}
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
