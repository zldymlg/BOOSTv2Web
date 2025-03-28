import React, { useState } from "react";
import "./Flashcard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";
import ExpBar from "./exp-notif-cal.tsx";
import FlashcardDetails from "./Flashcard-content.tsx";


type ActiveComponentState =
  | "flashcard"
  | { name: "flashcardDetails"; deckTitle: string; deckDescription: string };

export default function Flashcard() {
  const [showAddDeckModal, setShowAddDeckModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentState>("flashcard");

  const [topics, setTopics] = useState<
    {
      id: number;
      title: string;
      decks: { name: string; description: string }[];
    }[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAddDeck = (topicId: number) => {
    setSelectedTopicId(topicId);
    setShowAddDeckModal(true);
  };

  const handleCloseAddDeck = () => {
    setShowAddDeckModal(false);
    setNewDeckName("");
    setNewDeckDescription("");
    setSelectedTopicId(null);
  };

  const handleCreateDeck = () => {
    if (newDeckName.trim() === "" || selectedTopicId === null) return;
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedTopicId
          ? {
              ...topic,
              decks: [
                ...topic.decks,
                {
                  name: newDeckName.trim(),
                  description: newDeckDescription.trim(),
                },
              ],
            }
          : topic
      )
    );
    handleCloseAddDeck();
  };

  const handleOpenAddTopic = () => setShowAddTopicModal(true);
  const handleCloseAddTopic = () => {
    setShowAddTopicModal(false);
    setNewTopicName("");
  };

  const handleCreateTopic = () => {
    if (newTopicName.trim() === "") return;
    const newTopic = {
      id: Date.now(),
      title: newTopicName.trim(),
      decks: [],
    };
    setTopics((prevTopics) => [...prevTopics, newTopic]);
    handleCloseAddTopic();
  };

  const handleDeleteDeck = (deckTitle: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        decks: topic.decks.filter((deck) => deck.name !== deckTitle),
      }))
    );
    setActiveComponent("flashcard"); 
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.decks.some((deck) =>
      deck.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <React.Fragment>
      <ExpBar />
      {activeComponent === "flashcard" ? (
        <>
          <div className="row w-100 ps-3 pe-3">
            <button className="btn col-auto border rounded-5 me-2" id="search">
              <BsSearch />
            </button>
            <input
              className="col rounded-5 border"
              id="searchinput"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {filteredTopics.map((topic) => (
            <div key={topic.id} className="mt-4">
              <h3 className="ms-3">{highlightText(topic.title, searchQuery)}</h3>
              <div
                id="flashcard-container"
                className="row flex-nowrap overflow-x-auto ms-1 me-1"
              >
                {topic.decks.map((deck, index) => (
                  <div
                    key={index}
                    id="flashcard-card"
                    className="col-12 col-sm-6 col-md-4 col-lg-3 ms-3 card rounded-5 btn text-start p-3"
                    onClick={() =>
                      setActiveComponent({
                        name: "flashcardDetails",
                        deckTitle: deck.name,
                        deckDescription: deck.description,
                      })
                    }
                  >
                    <h5 id="flashcard-title" className="m-2">
                      {highlightText(deck.name, searchQuery)}
                    </h5>
                    <p
                      id="flashcard-description"
                      className="text-muted small ms-3"
                    >
                      {deck.description}
                    </p>
                    <h6 className="text-end mt-3">5 Cards</h6>
                  </div>
                ))}

                <button
                  className="col-12 col-sm-6 col-md-4 col-lg-3 ms-3 card rounded-5 btn d-flex align-items-center justify-content-center"
                  id="add-deck"
                  onClick={() => handleOpenAddDeck(topic.id)}
                >
                  + Add Deck
                </button>
              </div>
            </div>
          ))}

          <div className="ms-3">
            <button
              className="btn ms-3 mt-4 ps-5 pe-5 rounded-5"
              id="add-topic"
              onClick={handleOpenAddTopic}
            >
              + Add Topic
            </button>
          </div>
        </>
      ) : (
        <FlashcardDetails
          onBack={() => setActiveComponent("flashcard")}
          deckTitle={activeComponent.deckTitle}
          deckDescription={activeComponent.deckDescription}
          onDeleteDeck={handleDeleteDeck} 
        />
      )}

      {showAddDeckModal && (
        <div className="modal-backdrop-deck">
          <div className="modal-content p-4 rounded-5" id="card-bg">
            <h3>Create New Deck</h3>
            <p>A Deck is a set of flashcards.</p>
            <input
              type="text"
              placeholder="Deck Title (required)"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              className="modal-input form-control mb-2"
            />
            <textarea
              placeholder="Deck Description"
              value={newDeckDescription}
              onChange={(e) => setNewDeckDescription(e.target.value)}
              className="modal-input form-control mb-3"
            />
            <div className="modal-buttons">
              <button
                onClick={handleCloseAddDeck}
                className="btn btn-secondary me-2"
              >
                Cancel
              </button>
              <button onClick={handleCreateDeck} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTopicModal && (
        <div className="modal-backdrop-topic">
          <div className="modal-content p-4 rounded-5" id="card-bg">
            <h3>Create New Topic</h3>
            <p>A Topic is a set of decks.</p>
            <input
              type="text"
              placeholder="Topic Title (required)"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              className="modal-input form-control mb-3"
            />
            <div className="modal-buttons">
              <button
                onClick={handleCloseAddTopic}
                className="btn btn-secondary me-2"
              >
                Cancel
              </button>
              <button onClick={handleCreateTopic} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}