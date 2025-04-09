import React, { useState, useEffect } from "react";
import { RxExit } from "react-icons/rx";
import "./Flashcard-QnA.css";

interface FlashcardQnAProps {
  deckTitle: string;
  cards: { id: string; question: string; answer: string }[];
  onExit: () => void;
}

export default function FlashcardQnA({ deckTitle, cards, onExit }: FlashcardQnAProps) {
  const [remainingQuestions, setRemainingQuestions] = useState(cards); // Track remaining questions
  const [currentQuestion, setCurrentQuestion] = useState<{
    id: string;
    question: string;
    answer: string;
  } | null>(null);
  const [choices, setChoices] = useState<string[]>([]); // Store choices for the current question
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const question = remainingQuestions[randomIndex];
      setCurrentQuestion(question);

      // Generate choices for the current question
      const incorrectAnswers = [...cards]
        .filter((card) => card.id !== question.id) // Exclude the current question
        .sort(() => 0.5 - Math.random()) // Shuffle the remaining cards
        .slice(0, 3) // Take 3 random incorrect answers
        .map((card) => card.answer); // Map to answers
      const allChoices = [...incorrectAnswers, question.answer].sort(() => 0.5 - Math.random()); // Add the correct answer and shuffle
      setChoices(allChoices);
    } else {
      setQuizCompleted(true); // Mark the quiz as completed when no questions remain
    }
  }, [remainingQuestions]);

  const handleChoiceSelection = (choice: string) => {
    if (selectedChoice) return; // Prevent multiple selections

    setSelectedChoice(choice);

    if (choice === currentQuestion!.answer) {
      setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
    }

    setShowNextButton(true); // Show the "Next Question" button
  };

  const handleNextQuestion = () => {
    setRemainingQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== currentQuestion!.id)
    ); // Remove the current question from the remaining questions
    setSelectedChoice(null); // Reset the selected choice for the next question
    setShowNextButton(false); // Hide the "Next Question" button
  };

  if (cards.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <p>No questions available.</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="container mt-4 text-center">
        <h3>Quiz Completed!</h3>
        <p>
          Your Score: {score}/{cards.length}
        </p>
        <button className="btn btn-primary" onClick={onExit}>
          Exit Quiz
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container mt-4 text-center">
        <p>Loading question...</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <RxExit size="30" className="m-2 me-4" id="exit-btn" onClick={onExit} />
        </div>
        <div id="bg-1" className="d-flex flex-wrap align-items-center">
          <span className="ms-4 me-2">Deck: {deckTitle}</span>
          <span className="ms-2">
            Score: {score}/{cards.length}
          </span>
        </div>

        <div className="container">
          <div id="question-card" className="card mt-4 text-center p-3">
            {currentQuestion.question}
          </div>
          <div id="choices-container" className="row justify-content-center gap-3 mt-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                className={`btn col-12 col-sm-5 col-md-3 ${
                  selectedChoice
                    ? choice === currentQuestion.answer
                      ? "btn-success" // Highlight correct answer in green
                      : choice === selectedChoice
                      ? "btn-danger" // Highlight incorrect answer in red
                      : "btn-danger" // Disable other choices
                    : "btn-primary"
                }`}
                id="choice-btn"
                onClick={() => handleChoiceSelection(choice)}
                disabled={!!selectedChoice} // Disable buttons after a choice is made
              >
                {choice}
              </button>
            ))}
          </div>
          {showNextButton && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}