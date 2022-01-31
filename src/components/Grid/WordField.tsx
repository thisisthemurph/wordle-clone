import { LetterField, LetterState } from "./LetterField";

interface WordFieldProps {
  answer: string;
  guess?: string;
  isActive: boolean;
}

export const WordField = ({ answer, guess, isActive }: WordFieldProps) => {
  if (!guess) {
    return (
      <div className="grid__word">
        <LetterField letterState={LetterState.Unknown} letter={"\u00A0"} />
        <LetterField letterState={LetterState.Unknown} letter={"\u00A0"} />
        <LetterField letterState={LetterState.Unknown} letter={"\u00A0"} />
        <LetterField letterState={LetterState.Unknown} letter={"\u00A0"} />
        <LetterField letterState={LetterState.Unknown} letter={"\u00A0"} />
      </div>
    );
  }

  let guessLetters = Array.from(guess);
  guessLetters = guessLetters.concat(
    Array(5 - guessLetters.length).fill("\u00A0")
  );

  const getLetterState = (
    index: number,
    letter: string,
    answer: string
  ): LetterState => {
    const correctLetter = answer[index];

    if (isActive) {
      return LetterState.Unknown;
    }

    if (letter === correctLetter) {
      return LetterState.CorrectLocation;
    } else if (answer.includes(letter)) {
      return LetterState.CorrectWrongLocation;
    } else {
      return LetterState.Incorrect;
    }
  };

  return (
    <div className="grid__word">
      {guessLetters.map((letter, idx) => (
        <LetterField
          key={idx}
          letter={letter}
          letterState={getLetterState(idx, letter, answer)}
        />
      ))}
    </div>
  );
};
