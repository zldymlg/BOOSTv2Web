import React from "react";
import { RxExit } from "react-icons/rx";
import "./Flashcard-QnA.css";


interface FlashcardQnAProps {
  cards: { question: string; answer: string }[];
  deckTitle: string;
  onExit: () => void;
}

export default function FlashcardQnA({ cards, deckTitle, onExit }: FlashcardQnAProps) {
  return (
    <React.Fragment>
    <div className="container mt-4">
      <RxExit size="20" className="m-2 me-4" style={{ cursor: "pointer" }} onClick={onExit} />
      <h2>{deckTitle}</h2>
      <p>Flashcard Q&A session will be implemented here.</p>
    </div>
    </React.Fragment>
  );
}
