import { useState } from "react";
import "./AddComment.css";

function AddComment() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = () => {
    if (comment !== "" && comment !== " ") {
      fetch("../data/data.json", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div className="add-comment">
      <textarea
        type="text"
        name="comment"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="footer">
        <img
          src="../src/assets/avatars/image-juliusomo.png"
          alt="avatar image"
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default AddComment;
