import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
<<<<<<< HEAD
import { collection, onSnapshot, doc, deleteDoc,updateDoc } from "firebase/firestore";
=======
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
>>>>>>> a011e16bb94ee38de1cf98df99270e917f4d6558
import { useUserAuth } from "../Context/UserAuthContext";
import Modal from "react-modal";
import EachFlashCards from "./EachFlashCards.js";
import StudyEachCard from "./StudyEachCard.js";
import EachFlashCardsWDE from "./EachFlashCardsWDE.js";
import { useHistory } from "react-router-dom";
import AddMoreCardQA from "./AddMoreCardQA.js";

export default function StudyFlashCards({ deckName, isOpen, onClose }) {
  const [decks1, setDecks1] = useState([]);
  const [flashcard, setFlashcard] = useState([]);
  const { user } = useUserAuth();
  let history = useHistory();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  useEffect(() => {
    // setLoading(true);
    console.log(deckName);
    const DecksCollectionRef = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    // const todoQuery = query(DecksCollectionRef, orderBy("timeStamp", "desc"));
    const unsub2 = onSnapshot(DecksCollectionRef, (queryS) => {
      // const decksArray = [];
      const flashCardArray = [];
      queryS.forEach((doc) => {
        flashCardArray.push({ ...doc.data(), id: doc.id });
      });
      // console.log(decksArray);
      setDecks1(flashCardArray);
      //   for (let i = 0; i < decksArray.length; i++) {
      //     flashCardArray[i] = decksArray[i].deckTitle;
      //   }
      //   console.log(flashCardArray);
      //   setFlashcard(flashCardArray);
      // });
    });
    return () => unsub2();
  }, []);
  // now decks has all the
  // console.log(decks1.length);
  // console.log(flashcard);

  // console.log(decks1[0]);
  // console.log(Object.keys(decks1[0]).length)

  console.log(isOpen);
  const handleDelete = async (id) => {
    const docRef3 = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      id
    );
    await deleteDoc(docRef3);
  };
  const handleEdit = async (flash, newWord, newDefinition, newExample ) => {
    const docRef4 = doc(db, "user",
    user.uid,
    "flashcard",
    deckName,
    "deck",
    flash.id);
    await updateDoc(docRef4, {definition: newDefinition, example: newExample, word: newWord});
  };

  const handleEdit2 = async (flash, newQuestion, newAnswer) => {
    const docRef = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      flash.id
    );
    await updateDoc(docRef, { question: newQuestion, answer: newAnswer });
  };


  // const toggleComplete = async (flash) => {
  //   const docRef5 = doc(db, "user",
  //   user.uid,
  //   "flashcard",
  //   deckName,
  //   "deck",
  //   flash.id);
  //   await updateDoc(docRef5, { completed: !flash.completed });
  // };

  const handleAdd = () => {
    if (Object.keys(decks1[0]).length == 3) {
      // push it to the page with word and definition
      history.push({
        pathname: "/addMoreCardQA",
        state: { decksName: deckName },
      });
    } else if (Object.keys(decks1[0]).length == 4) {
      // push it to the page with word and definition
      history.push({
        pathname: "/addMoreCardWDE",
        state: { decksName: deckName },
      });
    } else {
      //push it to the page that takes the word, definition, purpose and image
    }
  };

  const handleEdit = async (flash, newQuestion, newAnswer) => {
    const docRef = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      flash.id
    );
    await updateDoc(docRef, { question: newQuestion, answer: newAnswer });
  };

  // console.log(Object.keys(decks1[0]).length); // this is how we get length of the object
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        center
        styles={customStyles}
      >
        <div>
          {/* here have the study Flashcard component which will flip onClick */}
          <StudyEachCard deckName={deckName} />
        </div>
        {/* <h1>CARDS ON {deckName}: </h1> */}
        <div className=" flashcard-deck-title gradient__text">
          CARDS ON {deckName}:
        </div>
        <div>
          {decks1.map((flash) => (
            <div>
              {Object.keys(flash).length == 3 && (
<<<<<<< HEAD
                <EachFlashCards flash={flash} handleDelete={handleDelete} handleEdit2 = {handleEdit2} />
=======
                <EachFlashCards
                  flash={flash}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
>>>>>>> a011e16bb94ee38de1cf98df99270e917f4d6558
              )}
              {Object.keys(flash).length == 4 && (
                <EachFlashCardsWDE  flash={flash} handleDelete={handleDelete} handleEdit = {handleEdit}  />
              )}
            </div>
            // {/* // here call another component for each flashcards  */}
          ))}
        </div>
        <div>
          <button onClick={handleAdd}>ADD NEW CARDS</button>
        </div>
      </Modal>

      <div></div>
    </div>
  );
}
