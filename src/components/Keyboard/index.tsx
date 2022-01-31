import { KeyObject } from "./Key";
import "./Keyboard.scss";
import { KeySet } from "./KeySet";

const makeKeyboardObject = (
  setGuess: (letter: string) => void,
  enter: () => void,
  del: () => void
): KeyObject[][] => {
  const letterToKeyObject = (letter: string) => {
    return {
      value: letter,
      action: () => setGuess(letter),
    };
  };

  const delKey = { value: "\u2190", action: () => del() };
  const enterKey = { value: "\u2713", action: () => enter() };
  const keys = [
    Array.from("qwertyuiop").map((letter) => letterToKeyObject(letter)),
    Array.from("asdfghjkl").map((letter) => letterToKeyObject(letter)),
    Array.from("zxcvbnm").map((letter) => letterToKeyObject(letter)),
  ];

  keys[2].unshift(enterKey);
  keys[2].push(delKey);

  return keys;
};

interface KeyboardProps {
  setGuess: (letter: string) => void;
  enter: () => void;
  del: () => void;
  canType: boolean;
  correctLetters: string[];
  wrongLocationLetters: string[];
  incorrectLetters: string[];
}

export const Keyboard = ({
  setGuess,
  enter,
  del,
  canType,
  correctLetters,
  wrongLocationLetters,
  incorrectLetters,
}: KeyboardProps) => {
  const keys = makeKeyboardObject(setGuess, enter, del);

  return (
    <div className="keyboard">
      {keys.map((keys, idx) => {
        return (
          <KeySet
            key={idx}
            keys={keys}
            canType={canType}
            correctLetters={correctLetters}
            wrongLocationLetters={wrongLocationLetters}
            incorrectLetters={incorrectLetters}
          />
        );
      })}
    </div>
  );
};
