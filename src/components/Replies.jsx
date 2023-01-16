import "./Replies.css";

function Replies({
  currentUser,
  reply,
  onPlusScore,
  onMinusScore,
  score,
  onModal,
}) {
  const { user, content, createdAt, replyingTo } = reply;

  const isCurrentUser = currentUser.username === user.username;

  return isCurrentUser ? (
    <div className="reply">
      <div>
        <div className="comment-header">
          <img src={user.image} alt="avatar image" className="img-avatar" />
          <h5 className="name">{user.username}</h5>
          <div className="date">{createdAt}</div>
        </div>

        <div className="comment-main">
          <p className="comment-text">
            <span className="replying-to">@{replyingTo}</span>
            {content}
          </p>
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
          <div className="reply-btn">
            <button className="delete-btn" onClick={onModal}>
              <img
                src="../src/assets/icon-delete.svg"
                alt="delete-icon"
                className="icon-delete"
              />
              Delete
            </button>
            <button>
              <img
                src="../src/assets/icon-edit.svg"
                alt="edit-icon"
                className="icon-edit"
              />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="reply">
      <div>
        <div className="comment-header">
          <img src={user.image} alt="avatar image" className="img-avatar" />
          <h5 className="name">{user.username}</h5>
          <div className="date">{createdAt}</div>
        </div>

        <div className="comment-main">
          <p className="comment-text">
            <span className="replying-to">@{replyingTo}</span>
            {content}
          </p>
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
          <div className="reply-btn">
            <button>
              <img
                src="../src/assets/icon-reply.svg"
                alt="reply-icon"
                className="icon-reply"
              />
              <span className="reply-text">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Replies;
