import { match } from "assert";
import { useState } from "react";
import { LetterField, LetterState } from "./LetterField";

interface WordFieldProps {
  answer: string;
  guess?: string;
  isActive: boolean;
}

export const WordField = ({
  answer,
  guess,
  isActive: isActiveWord,
}: WordFieldProps) => {
  if (!guess) {
    return (
      <div className="grid__word">
        {Array.from(answer).map((_, idx) => (
          <LetterField
            key={idx}
            letterState={LetterState.Unknown}
            letter={"\u00A0"}
          />
        ))}
      </div>
    );
  }

  let guessLetters = Array.from(guess);
  guessLetters = guessLetters.concat(
    Array(5 - guessLetters.length).fill("\u00A0")
  );

  /**
   * Count the number of occurrences of letter in word
   * @param word the word to be checked
   * @param letter the letter to be counted in the word
   * @returns the number of occurrences
   */
  const countLetterOccurrences = (word: string, letter: string): number => {
    return (word.match(new RegExp(letter, "g")) || []).length;
  };

  /**
   * Returns an array of indexes of the given letter
   * @param word the word to be searched over
   * @param letter the letter to be searched for
   * @returns an array of indexes of letter in word
   */
  const getLetterIndexes = (word: string, letter: string): number[] => {
    return Array.from(word.matchAll(new RegExp(letter, "g")))
      .filter((match) => {
        return typeof match.index === "number" ? true : false;
      })
      .map((match) => {
        if (match.index === undefined) return -1;
        return match.index;
      })
      .filter((index) => index >= 0);
  };

  const getLetterState = (letterIndex: number, letter: string): LetterState => {
    const correctLetter = answer[letterIndex];

    if (isActiveWord) {
      // A non-submitted word does not have the coloured styling
      return LetterState.Unknown;
    }

    if (letter === correctLetter) {
      return LetterState.CorrectLocation;
    }

    if (!answer.includes(letter)) {
      return LetterState.Incorrect;
    }

    //
    // The letter must be included in the answer but in an incorrect location
    //

    const guessLetterOccurrences = countLetterOccurrences(guess, letter);
    const answerLetterOccurrences = countLetterOccurrences(answer, letter);
    const diff = guessLetterOccurrences - answerLetterOccurrences;

    if (diff === 0) {
      // There are the same number of guesses of the letter as answers
      return LetterState.CorrectWrongLocation;
    }

    const answerLetterIndexes = getLetterIndexes(answer, letter);
    const guessLetterInexes = getLetterIndexes(guess, letter).filter(
      (letterIndex) => !answerLetterIndexes.includes(letterIndex)
    );

    // We only want to highlight an appropriate number of letters as wrong location so...
    // Remove letter indexes where there are more than the number of correct letters in the andwer
    // and determine if the index of the current letter is contained within the array
    const highlightThisLetter = guessLetterInexes
      .filter((_, idx) => idx < diff)
      .includes(letterIndex);

    if (highlightThisLetter) {
      return LetterState.CorrectWrongLocation;
    }

    return LetterState.Incorrect;
  };

  return (
    <div className="grid__word">
      {guessLetters.map((letter, idx) => (
        <LetterField
          key={idx}
          letter={letter}
          letterState={getLetterState(idx, letter)}
        />
      ))}
    </div>
  );
};
