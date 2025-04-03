import React, { useState, useEffect } from "react";
import "./Flashcard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";
import ExpBar from "./exp-notif-cal.tsx";
import FlashcardDetails from "./Flashcard-content.tsx";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

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
      id: string;
      title: string;
      decks: { name: string; description: string }[];
    }[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsCollection = await getDocs(collection(db, "topics"));
      const topicsData = topicsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as typeof topics;
      setTopics(topicsData);
    };
    fetchTopics();
  }, []);

  const handleOpenAddDeck = (topicId: string) => {
    setSelectedTopicId(topicId);
    setShowAddDeckModal(true);
  };

  const handleCloseAddDeck = () => {
    setShowAddDeckModal(false);
    setNewDeckName("");
    setNewDeckDescription("");
    setSelectedTopicId(null);
  };

  const handleCreateDeck = async () => {
    if (newDeckName.trim() === "" || selectedTopicId === null) return;
    const topicRef = doc(db, "topics", selectedTopicId);
    await addDoc(collection(topicRef, "decks"), {
      name: newDeckName.trim(),
      description: newDeckDescription.trim(),
    });
    handleCloseAddDeck();
  };

  const handleOpenAddTopic = () => setShowAddTopicModal(true);
  const handleCloseAddTopic = () => {
    setShowAddTopicModal(false);
    setNewTopicName("");
  };

  const handleCreateTopic = async () => {
    if (newTopicName.trim() === "") return;
    const newTopicRef = await addDoc(collection(db, "topics"), {
      title: newTopicName.trim(),
      decks: [],
    });
    setTopics((prevTopics) => [...prevTopics, { id: newTopicRef.id, title: newTopicName.trim(), decks: [] }]);
    handleCloseAddTopic();
  };

  const handleDeleteDeck = async (deckTitle: string) => {
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
                    <p id="flashcard-description" className="text-muted small ms-3">
                      {deck.description}
                    </p>
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
        </>
      ) : (
        <FlashcardDetails
          onBack={() => setActiveComponent("flashcard")}
          deckTitle={activeComponent.deckTitle}
          deckDescription={activeComponent.deckDescription}
          onDeleteDeck={handleDeleteDeck}
        />
      )}
    </React.Fragment>
  );
}
