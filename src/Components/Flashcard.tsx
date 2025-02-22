import React, { useState } from "react";
import "./Flashcard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";

export default function Flashcard() {
  const [showAddDeckModal, setShowAddDeckModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  const [topics, setTopics] = useState<
    {
      id: number;
      title: string;
      decks: { name: string; description: string }[];
    }[]
  >([]);

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

  return (
    <React.Fragment>
      <div id="lvlprogress">
        Level 0 <progress value="10" max="100" id="xpbar" /> 0/0xp
      </div>
      <hr className="m-5" />
      <div className="row w-50 ps-5">
        <button className="btn col-sm-auto border rounded-5 me-2" id="search">
          <BsSearch />
        </button>
        <input
          className="col-sm-10 rounded-5 border"
          id="searchinput"
          placeholder="Search..."
        />
      </div>
      {topics.map((topic) => (
        <div key={topic.id} className="mt-4">
          <h3 className="ms-5">{topic.title}</h3>
          <div className="row flex-nowrap overflow-x-auto">
            {topic.decks.map((deck, index) => (
              <div key={index} className="col-sm-3 ms-5 card rounded-5">
                <h5 className="ps-4 pt-3">{deck.name}</h5>
                <div className="ps-5 pt-1 pb-5 deck-description">
                  {deck.description}
                </div>
                <h6 className="text-end p-3">5 Cards</h6>
              </div>
            ))}
            <button
              className="col-sm-3 ms-5 card rounded-5 btn d-flex align-items-center justify-content-center"
              id="add-deck"
              onClick={() => handleOpenAddDeck(topic.id)}
            >
              + Add Deck
            </button>
          </div>
        </div>
      ))}
      <div className="ms-5">
        <button
          className="btn ms-5 mt-4 ps-5 pe-5 rounded-5"
          id="add-topic"
          onClick={handleOpenAddTopic}
        >
          + Add Topic
        </button>
      </div>
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
