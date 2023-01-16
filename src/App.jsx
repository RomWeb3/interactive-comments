import "./App.css";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import Replies from "./components/Replies";
import Modal from "./components/Modal";
import data from "./data/data.json";
import { useState } from "react";

function App() {
  const [scores, setScores] = useState(
    data.comments.concat(
      data.comments
        .map(({ replies }) => replies)
        .flat()
        .map(({ id, score }) => ({ id, score }))
    )
  );
  const [datas, setDatas] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [initialScores, setInitialScores] = useState(scores);
  const [selectedReplyId, setSelectedReplyId] = useState(null);

  const handleScoreChange = (id, value) => {
    const currentScore = scores.find(({ id: scoreId }) => scoreId === id).score;
    const initialScore = initialScores.find(
      ({ id: scoreId }) => scoreId === id
    ).score;
    if (
      (currentScore > initialScore && value === 1) ||
      (currentScore < initialScore && value === -1)
    )
      return;
    setScores((prevScore) =>
      prevScore.map((scoreObj) =>
        scoreObj.id === id ? { id, score: currentScore + value } : scoreObj
      )
    );
  };

  const handleDeleteReply = (selectedReplyId) => {
    setDatas((prevData) => ({
      ...prevData,
      comments: prevData.comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter(
            (reply) => reply.id !== selectedReplyId
          ),
        };
      }),
    }));
    setShowModal(false);
  };

  const handleConfirmDelete = (id) => {
    setSelectedReplyId(id);
    return setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      {datas.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          score={scores.find(({ id }) => id === comment.id).score}
          onPlusScore={() => handleScoreChange(comment.id, 1)}
          onMinusScore={() => handleScoreChange(comment.id, -1)}
          currentUser={data.currentUser}
        >
          <div className="replies">
            {comment.replies.map((reply) => (
              <Replies
                key={reply.id}
                reply={reply}
                score={scores.find(({ id }) => id === reply.id).score}
                onPlusScore={() => handleScoreChange(reply.id, 1)}
                onMinusScore={() => handleScoreChange(reply.id, -1)}
                currentUser={data.currentUser}
                onModal={() => handleConfirmDelete(reply.id)}
              />
            ))}
          </div>
        </Comment>
      ))}
      <AddComment />
      {showModal && (
        <Modal
          onDelete={() => handleDeleteReply(selectedReplyId)}
          onCancel={() => handleCancelDelete()}
        />
      )}
    </div>
  );
}

export default App;
