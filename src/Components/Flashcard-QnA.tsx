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
    <RxExit size="30" className="m-2 me-4" id="exit-btn" onClick={onExit} />

      <div id="bg-1">
        <span className="ms-4 me-2">Deck: {deckTitle}</span>
        <span className="ms-2">Card: 0/0</span>
      </div>
      <div className="container">
        <div className="card mt-4">questions</div>
        <div className="row flex justify-content-center gap-5 mt-4">
          <button className="btn col-sm-auto" id="answer-btn">Answer</button>
          <button className="btn col-sm-auto" id="answer-btn">Answer</button>
        </div>
        <div className="row flex justify-content-center gap-5 mt-3">
          <button className="btn col-sm-auto" id="answer-btn">Answer</button>
          <button className="btn col-sm-auto" id="answer-btn">Answer</button>  
        </div>


      </div>
    </div>
    </React.Fragment>
  );
}
