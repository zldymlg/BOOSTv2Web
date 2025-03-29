import React, { useState, useEffect } from "react";
import { RxExit } from "react-icons/rx";
import "./Flashcard-QnA.css";

interface FlashcardQnAProps {
  deckTitle: string;
  onExit: () => void;
}

export default function FlashcardQnA({ deckTitle, onExit }: FlashcardQnAProps) {
  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <RxExit size="30" className="m-2 me-4" id="exit-btn" onClick={onExit} />
          </div>
          <div id="bg-1" className="d-flex flex-wrap align-items-center">
            <span className="ms-4 me-2">Deck: {deckTitle}</span>
            <span className="ms-2">0/0</span>
          </div>

        <div className="container">
          <div id="question-card" className="card mt-4 text-center">
            Questions
          </div>
          <div id="choices-container" className="row justify-content-center gap-3 mt-4">
            <button className="btn col-12 col-sm-5 col-md-3" id="choice-btn">
              Choice 1
            </button>
            <button className="btn col-12 col-sm-5 col-md-3" id="choice-btn">
              Choice 2
            </button>
          </div>
          <div id="choices-container" className="row justify-content-center gap-3 mt-4">
            <button className="btn col-12 col-sm-5 col-md-3" id="choice-btn">
              Choice 1
            </button>
            <button className="btn col-12 col-sm-5 col-md-3" id="choice-btn">
              Choice 2
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}