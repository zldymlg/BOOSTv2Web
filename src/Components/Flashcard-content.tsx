import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosAddCircle } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import "./Flashcard-content.css";
import { Modal, Button, Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import StartFlashcards from "./Flashcard-QnA.tsx";
import { db, auth } from "../firebase"; // Ensure Firebase is configured
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardContentProps {
  onBack: () => void;
  deckId: string;
  topicId: string;
  deckTitle: string;
  deckDescription: string;
}

export default function FlashcardContent({
  onBack,
  deckId,
  topicId,
  deckTitle,
  deckDescription,
}: FlashcardContentProps) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const user = auth.currentUser;
  const cardsCollection = user
    ? collection(db, `users/${user.uid}/flashcard/${topicId}/decks/${deckId}/cards`)
    : null;

  useEffect(() => {
    if (!cardsCollection) return;

    const fetchCards = async () => {
      const querySnapshot = await getDocs(cardsCollection);
      const fetchedCards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Flashcard[];
      setCards(fetchedCards);
    };

    fetchCards();
  }, [cardsCollection]);

  const addCard = async () => {
    if (!cardsCollection || newQuestion.trim() === "" || newAnswer.trim() === "") return;

    const newCard = { question: newQuestion, answer: newAnswer };
    const docRef = await addDoc(cardsCollection, newCard);
    setCards([...cards, { id: docRef.id, ...newCard }]);
    setNewQuestion("");
    setNewAnswer("");
    setShowCreateModal(false);
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setNewQuestion(cards[index].question);
    setNewAnswer(cards[index].answer);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (editIndex === null || !cardsCollection || newQuestion.trim() === "" || newAnswer.trim() === "") return;

    const cardId = cards[editIndex].id;
    const cardRef = doc(db, `users/${user!.uid}/flashcard/${topicId}/decks/${deckId}/cards`, cardId);
    await updateDoc(cardRef, { question: newQuestion, answer: newAnswer });

    const updatedCards = [...cards];
    updatedCards[editIndex] = { id: cardId, question: newQuestion, answer: newAnswer };
    setCards(updatedCards);
    setEditIndex(null);
    setShowEditModal(false);
  };

  const deleteCard = async (index: number) => {
    if (!cardsCollection) return;

    const cardId = cards[index].id;
    const cardRef = doc(db, `users/${user!.uid}/flashcard/${topicId}/decks/${deckId}/cards`, cardId);
    await deleteDoc(cardRef);

    setCards(cards.filter((_, i) => i !== index));
  };

  if (isStarting) {
    return <StartFlashcards cards={cards} deckTitle={deckTitle} onExit={() => setIsStarting(false)} />;
  }

  return (
    <React.Fragment>
      <div className="container d-flex align-items-center justify-content-between mt-3 flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <IoIosArrowBack
            onClick={onBack}
            size="40"
            className="m-2 me-4"
            style={{ cursor: "pointer" }}
          />
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <GoStack size="100" />
            <div>
              <h3 className="mb-1 text-center text-md-start text-wrap">{deckTitle}</h3>
              <p className="mb-2 text-muted text-center text-md-start text-wrap">by: @user</p>
              <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-md-start">
                <button
                  className="btn btn-primary"
                  id="start-btn"
                  onClick={() => setIsStarting(true)}
                  disabled={cards.length < 4}
                >
                  Start
                </button>
                <span className="text-primary fw-bold" style={{ cursor: "pointer" }}>
                  <IoShareSocialSharp size="30" />
                  Share
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h3>Description:</h3>
        <span className="ms-5 text-wrap">{deckDescription}</span>
        <hr />
      </div>

      <div className="container mt-4 me-4">
        <h2>Cards</h2>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="card p-3 d-flex align-items-center justify-content-between flex-row mb-2 flex-wrap"
          >
            <span className="text-break">{card.question}</span>
            <div className="d-flex gap-3">
              <FaEdit size="20" style={{ cursor: "pointer" }} onClick={() => openEditModal(index)} />
              <MdDeleteForever size="20" style={{ cursor: "pointer" }} onClick={() => deleteCard(index)} />
            </div>
          </div>
        ))}
        <div
          className="d-flex align-items-center justify-content-center mt-3 mb-5"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCreateModal(true)}
        >
          <IoIosAddCircle size="30" className="rounded-circle bg-dark" style={{ color: "#FFCE1B" }} />
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
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
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
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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