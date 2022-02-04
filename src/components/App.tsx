import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";

import { ApiReader } from "../words/ApiReader";
import { Words } from "../words/Words";

function App() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [guesses, setGuesses] = useState<string[]>([""]);
  const [allowInput, setAllowInput] = useState(true);

  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLocLetters, setWrongLocLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);

  const reader = new ApiReader("http://localhost:3001");
  const words = new Words(reader);

  useEffect(() => {
    const fetchWord = async () => {
      setAnswer(await words.getRandomWord());
    };

    fetchWord();
  }, []);

  const inputLetter = (letter: string) => {
    let currentGuess = guesses[guesses.length - 1];
    if (currentGuess.length === 5) {
      return;
    }

    setGuesses([...guesses.slice(0, -1), currentGuess + letter]);
  };

  const deleteLastLetter = () => {
    let currentGuess = guesses[guesses.length - 1];
    if (currentGuess.length === 0) {
      return;
    }

    const parts = Array.from(currentGuess).slice(0, -1);
    setGuesses([...guesses.slice(0, -1), parts.join("")]);
  };

  const checkForWin = () => {
    if (guesses[guesses.length - 1] === answer) {
      setAllowInput(false);
    }
  };

  const setKeyboardLetters = (currentGuess: string) => {
    if (answer === null) return;

    const correct = [];
    const wrongLocation = [];
    const incorrect = [];

    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];

      if (letter === answer[i]) {
        correct.push(letter);
      } else if (answer.includes(letter)) {
        wrongLocation.push(letter);
      } else {
        incorrect.push(letter);
      }
    }

    setCorrectLetters([...correctLetters, ...correct]);
    setWrongLocLetters([...wrongLocLetters, ...wrongLocation]);
    setIncorrectLetters([...incorrectLetters, ...incorrect]);
  };

  const submitGuess = () => {
    let currentGuess = guesses[guesses.length - 1];
    if (!(currentGuess.length === 5)) return;

    setGuesses([...guesses, ""]);
    setKeyboardLetters(currentGuess);
    checkForWin();
  };

  if (answer === null) {
    return <p>Fetching wordle!</p>;
  }

  return (
    <div id="container">
      <Header />
      <Grid
        answer={answer}
        guesses={guesses}
        activeIndex={guesses.length - 1}
      />
      <Keyboard
        setGuess={inputLetter}
        enter={submitGuess}
        del={deleteLastLetter}
        canType={allowInput}
        correctLetters={correctLetters}
        wrongLocationLetters={wrongLocLetters}
        incorrectLetters={incorrectLetters}
      />
    </div>
  );
}

export default App;
