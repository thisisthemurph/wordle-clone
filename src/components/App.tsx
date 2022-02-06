import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";

import { ApiReader } from "../words/ApiReader";
import { Words } from "../words/Words";
import { AboutDialog } from "./AboutDialog";
import { StatsDialog } from "./StatsDislog";

interface GameState {
  answer: string;
  guesses: string[];
  allowInput: boolean;
  correctLetters: string[];
  wrongLocationLetters: string[];
  incorrectLetters: string[];
}

type LetterAssociations = {
  correct: string[];
  wrongLocation: string[];
  incorrect: string[];
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    answer: "",
    guesses: [""],
    allowInput: true,
    correctLetters: [],
    wrongLocationLetters: [],
    incorrectLetters: [],
  });

  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);

  const reader = new ApiReader("http://localhost:3001");
  const words = new Words(reader);

  useEffect(() => {
    const fetchWord = async () => {
      const answer = await words.getRandomWord();
      setGameState({ ...gameState, answer });
    };

    fetchWord();
  }, []);

  useEffect(() => {
    if (!gameState.allowInput) {
      setShowStatsDialog(true);
    }
  }, [gameState.allowInput]);

  /**
   * Determines if the game has been won
   * @returns true if game is won, else false
   */
  const gameIsWon = (): boolean => {
    const { answer, guesses } = gameState;
    return guesses[guesses.length - 1] !== answer;
  };

  /**
   * Determines the correct, wrong location, and icorrectly guessed letters
   * @param currentGuess the current/last guess made by the user
   * @returns a LetterAssociation object containing the determined letters
   */
  const getLetterAssociations = (currentGuess: string): LetterAssociations => {
    const associations: LetterAssociations = {
      correct: [],
      wrongLocation: [],
      incorrect: [],
    };

    if (!gameState.answer) return associations;

    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];

      if (letter === gameState.answer[i]) {
        associations.correct.push(letter);
      } else if (gameState.answer.includes(letter)) {
        associations.wrongLocation.push(letter);
      } else {
        associations.incorrect.push(letter);
      }
    }

    return associations;
  };

  const handleKeyboardInput = (letter: string) => {
    const { guesses } = gameState;

    let currentGuess = guesses[guesses.length - 1];
    if (currentGuess.length === 5) {
      return;
    }

    setGameState({
      ...gameState,
      guesses: [...guesses.slice(0, -1), currentGuess + letter],
    });
  };

  const handleKeyboardDelete = () => {
    const { guesses } = gameState;

    let currentGuess = guesses[guesses.length - 1];
    if (currentGuess.length === 0) {
      return;
    }

    const parts = Array.from(currentGuess).slice(0, -1);
    setGameState({
      ...gameState,
      guesses: [...guesses.slice(0, -1), parts.join("")],
    });
  };

  const handleSubmitGuess = () => {
    const { guesses } = gameState;

    const currentGuess = guesses[guesses.length - 1];
    if (!(currentGuess.length === 5)) return;

    const letterAssociations = getLetterAssociations(currentGuess);

    setGameState({
      ...gameState,
      guesses: [...guesses, ""],
      correctLetters: letterAssociations.correct,
      wrongLocationLetters: letterAssociations.wrongLocation,
      incorrectLetters: letterAssociations.incorrect,
      allowInput: gameIsWon(),
    });
  };

  if (!gameState.answer) {
    return <p>Fetching wordle!</p>;
  }

  return (
    <div id="container">
      <StatsDialog
        showDialog={showStatsDialog}
        setShowDialog={setShowStatsDialog}
      />

      <AboutDialog
        showDialog={showAboutDialog}
        setShowDialog={setShowAboutDialog}
      />

      <Header
        toggleAbout={() => setShowAboutDialog(!showAboutDialog)}
        toggleStats={() => setShowStatsDialog(!showStatsDialog)}
      />
      <Grid
        answer={gameState.answer}
        guesses={gameState.guesses}
        activeIndex={gameState.guesses.length - 1}
      />
      <Keyboard
        setGuess={handleKeyboardInput}
        enter={handleSubmitGuess}
        del={handleKeyboardDelete}
        canType={gameState.allowInput}
        correctLetters={gameState.correctLetters}
        wrongLocationLetters={gameState.wrongLocationLetters}
        incorrectLetters={gameState.incorrectLetters}
      />
    </div>
  );
}

export default App;
