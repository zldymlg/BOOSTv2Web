import React, { useEffect, useState } from "react";
import "./Flashcard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";
import ExpBar from "./exp-notif-cal.tsx";
import FlashcardDetails from "./Flashcard-content.tsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";

type ActiveComponentState =
  | "flashcard"
  | { name: "flashcardDetails"; deckTitle: string; deckDescription: string };

export default function Flashcard() {
  const [showAddDeckModal, setShowAddDeckModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentState>("flashcard");

  const [topics, setTopics] = useState<
    {
      id: string;
      title: string;
      decks: { id: string; name: string; description: string }[];
    }[]
  >([]);

  // Load topics and decks from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const topicsCollectionRef = collection(
          firestore,
          "users",
          userAuth.uid,
          "topics"
        );

        const unsubscribeTopics = onSnapshot(topicsCollectionRef, async (snapshot) => {
          const topicsData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const topic = {
                id: doc.id,
                ...(doc.data() as { title: string }),
                decks: [],
              };

              const decksCollectionRef = collection(
                firestore,
                "users",
                userAuth.uid,
                "topics",
                topic.id,
                "decks"
              );

              const deckSnapshot = await getDocs(decksCollectionRef);
              topic.decks = deckSnapshot.docs.map((deckDoc) => ({
                id: deckDoc.id,
                ...(deckDoc.data() as { name: string; description: string }),
              }));

              return topic;
            })
          );

          setTopics(topicsData);
        });

        return () => unsubscribeTopics();
      } else {
        setTopics([]);
      }
    });

    return () => unsubscribe();
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

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const decksCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "topics",
        selectedTopicId,
        "decks"
      );
      const newDeckRef = await addDoc(decksCollectionRef, {
        name: newDeckName.trim(),
        description: newDeckDescription.trim(),
        createdAt: serverTimestamp(),
      });

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === selectedTopicId
            ? {
                ...topic,
                decks: [
                  ...topic.decks,
                  {
                    id: newDeckRef.id,
                    name: newDeckName.trim(),
                    description: newDeckDescription.trim(),
                  },
                ],
              }
            : topic
        )
      );
    } catch (error) {
      console.error("Error creating deck:", error);
    }

    handleCloseAddDeck();
  };

  const handleOpenAddTopic = () => setShowAddTopicModal(true);
  const handleCloseAddTopic = () => {
    setShowAddTopicModal(false);
    setNewTopicName("");
  };

  const handleCreateTopic = async () => {
    if (newTopicName.trim() === "") return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const topicsCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "topics"
      );
      const newTopicRef = await addDoc(topicsCollectionRef, {
        title: newTopicName.trim(),
        createdAt: serverTimestamp(),
      });

      setTopics((prevTopics) => [
        ...prevTopics,
        { id: newTopicRef.id, title: newTopicName.trim(), decks: [] },
      ]);
    } catch (error) {
      console.error("Error creating topic:", error);
    }

    handleCloseAddTopic();
  };

  const handleDeleteDeck = async (deckId: string, topicId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const deckDocRef = doc(
        firestore,
        "users",
        user.uid,
        "topics",
        topicId,
        "decks",
        deckId
      );
      await deleteDoc(deckDocRef);

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === topicId
            ? {
                ...topic,
                decks: topic.decks.filter((deck) => deck.id !== deckId),
              }
            : topic
        )
      );
    } catch (error) {
      console.error("Error deleting deck:", error);
    }

    setActiveComponent("flashcard");
  };

  return (
    <React.Fragment>
      <ExpBar />
      {activeComponent === "flashcard" ? (
        <>
          <div className="row w-50 ps-5">
            <button
              className="btn col-sm-auto border rounded-5 me-2"
              id="search"
            >
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
              
              <div
                id="flashcard-container"
                className="row flex-nowrap overflow-x-auto ms-1 me-1"
              >
                {topic.decks.map((deck) => (
                  <div
                    key={deck.id}
                    id="flashcard-card"
                    className="col-sm-3 ms-5 card rounded-5 btn text-start p-3"
                    onClick={() =>
                      setActiveComponent({
                        name: "flashcardDetails",
                        deckTitle: deck.name,
                        deckDescription: deck.description,
                      })
                    }
                  >
                    <h5 id="flashcard-title" className="m-2">
                      {deck.name}
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
        </>
      ) : (
        <FlashcardDetails
          onBack={() => setActiveComponent("flashcard")}
          deckTitle={activeComponent.deckTitle}
          deckDescription={activeComponent.deckDescription}
          onDeleteDeck={(deckTitle) =>
            handleDeleteDeck(
              topics
                .find((topic) =>
                  topic.decks.some((deck) => deck.name === deckTitle)
                )
                ?.decks.find((deck) => deck.name === deckTitle)?.id!,
              selectedTopicId!
            )
          }
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