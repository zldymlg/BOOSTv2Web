import React, { useState } from "react";
import { IoIosArrowBack, IoIosAddCircle } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import "./Flashcard-content.css";
import { Modal, Button, Form } from "react-bootstrap";

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardContentProps {
  onBack: () => void;
  deckTitle: string;
  deckDescription: string;
}

export default function FlashcardContent({
  onBack,
  deckTitle,
  deckDescription,
}: FlashcardContentProps) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addCard = () => {
    if (newQuestion.trim() !== "" && newAnswer.trim() !== "") {
      setCards([...cards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
      setShowCreateModal(false);
    }
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setNewQuestion(cards[index].question);
    setNewAnswer(cards[index].answer);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (
      editIndex !== null &&
      newQuestion.trim() !== "" &&
      newAnswer.trim() !== ""
    ) {
      const updatedCards = [...cards];
      updatedCards[editIndex] = { question: newQuestion, answer: newAnswer };
      setCards(updatedCards);
      setEditIndex(null);
      setShowEditModal(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container d-flex align-items-center mt-3">
        <IoIosArrowBack
          onClick={onBack}
          size="40"
          className="m-2 me-4"
          style={{ cursor: "pointer" }}
        />
        <div className="d-flex align-items-center gap-4">
          <GoStack size="100" />
          <div>
            <h3 className="mb-1">{deckTitle}</h3>
            <p className="mb-2 text-muted">by: @user</p>
            <div className="d-flex align-items-center gap-5">
              <button className="btn" id="start-btn">
                Start
              </button>
              <span
                className="text-primary fw-bold"
                style={{ cursor: "pointer" }}
              >
                <IoShareSocialSharp size="30" />
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h3>Description:</h3>
        <span className="ms-5">{deckDescription}</span>
        <hr />
      </div>
      <div className="container mt-4 me-4">
        <h2>Cards</h2>
        {cards.map((card, index) => (
          <div
            key={index}
            className="card p-3 d-flex align-items-center justify-content-between flex-row mb-2"
          >
            <span>{card.question}</span>
            <FaEdit
              size="20"
              style={{ cursor: "pointer" }}
              onClick={() => openEditModal(index)}
            />
          </div>
        ))}
        <div
          className="d-flex align-items-center justify-content-center mt-3 mb-5 pb-5"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCreateModal(true)}
        >
          <IoIosAddCircle
            size="30"
            className="rounded-circle bg-dark"
            style={{ color: "#FFCE1B" }}
          />
          <span className="ms-2">Create New Card</span>
        </div>
      </div>

      <Modal
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
          setNewQuestion("");
          setNewAnswer("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Flashcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowCreateModal(false);
              setNewQuestion("");
              setNewAnswer("");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={addCard}>
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setNewQuestion("");
          setNewAnswer("");
          setEditIndex(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Flashcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEditModal(false);
              setNewQuestion("");
              setNewAnswer("");
              setEditIndex(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
