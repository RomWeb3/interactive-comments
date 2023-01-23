import "./Comment.css";
import { useState } from "react";
import AddReply from "./AddReply";

function Comment({
  currentUser,
  comment,
  children,
  onPlusScore,
  onMinusScore,
  score,
  onModal,
  editComment,
  addNewReply,
}) {
  const { user, content, createdAt } = comment;
  const isCurrentUser = currentUser.username === user.username;

  const [editing, setEditing] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [contentComment, setContentComment] = useState(content);

  const onUpdateComment = () => {
    editComment(contentComment, comment.id);
    setEditing(false);
  };

  return (
    <div className="container">
      <div className="comment">
        <div>
          <div className="comment-header">
            <img src={user.image} alt="avatar image" className="img-avatar" />
            <h5 className="name">{user.username}</h5>
            {isCurrentUser && <div className="you">you</div>}
            <div className="date">{createdAt}</div>
          </div>

          <div className="comment-main">
            {editing ? (
              <div className="edit-comment">
                <textarea
                  className="edit-textarea"
                  value={contentComment}
                  onChange={(e) => setContentComment(e.target.value)}
                />
                <div className="edit-btn">
                  <button className="update-btn" onClick={onUpdateComment}>
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p className="comment-text">{content}</p>
            )}
          </div>

          <div className="comment-footer">
            <div className="likes">
              <button onClick={onPlusScore}>
                <img
                  src="../src/assets/icon-plus.svg"
                  alt="plus-icon"
                  className="icon-plus"
                />
              </button>
              <span className="like-count">{score}</span>
              <button onClick={onMinusScore}>
                <img
                  src="../src/assets/icon-minus.svg"
                  alt="minus-icon"
                  className="icon-minus"
                />
              </button>
            </div>
            {isCurrentUser ? (
              <div className="reply-btn">
                <button className="delete-btn" onClick={onModal}>
                  <img
                    src="../src/assets/icon-delete.svg"
                    alt="delete-icon"
                    className="icon-delete"
                  />
                  Delete
                </button>
                <button onClick={() => setEditing(true)}>
                  <img
                    src="../src/assets/icon-edit.svg"
                    alt="edit-icon"
                    className="icon-edit"
                  />
                  Edit
                </button>
              </div>
            ) : (
              <div className="reply-btn">
                <button onClick={() => setShowReply((t) => !t)}>
                  <img
                    src="../src/assets/icon-reply.svg"
                    alt="reply-icon"
                    className="icon-reply"
                  />
                  <span className="reply-text">Reply</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReply && (
        <AddReply
          addNewReply={addNewReply}
          currentUser={currentUser}
          parent={comment}
          showReply={showReply}
          setShowReply={setShowReply}
          parentUser={comment.user}
        />
      )}
      <div className="replies">{children}</div>
    </div>
  );
}

export default Comment;
